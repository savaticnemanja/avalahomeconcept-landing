# --- Build stage ------------------------------------------------------------
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# OpenSSL is required by Prisma's query engine.
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Install dependencies (postinstall runs `prisma generate`).
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Build the Next.js app. DATABASE_URL is only needed for runtime, but the
# build must not fail importing the Prisma client, so provide a placeholder.
COPY . .
ENV DATABASE_URL="file:/data/app.db"
RUN npm run build

# --- Runtime stage ----------------------------------------------------------
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="file:/data/app.db"
ENV UPLOAD_DIR="/app/public/uploads"

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copy the built app and its dependencies (incl. the Prisma CLI for migrations).
COPY --from=builder /app/node_modules ./node_modules
# .next must be writable by the runtime user (image/ISR cache in .next/cache).
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
# src is needed by the seed script (reads dictionaries); scripts holds the seed
# source assets (gallery/ + projects/) and the manual import-houses script.
COPY --from=builder /app/src ./src
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Run as the image's unprivileged `node` user (uid 1000). The /data volume and
# the uploads bind mount are owned by uid 1000 on the host.
USER node

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
