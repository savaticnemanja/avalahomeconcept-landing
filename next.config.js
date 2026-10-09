/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Next streams generateMetadata output after </head> for clients it doesn't
  // treat as "HTML-limited bots" — and Googlebot isn't one, so About/Contact
  // shipped title/description/canonical/hreflang in <body>, where Google
  // ignores the canonical. Matching every UA keeps metadata in <head>.
  htmlLimitedBots: /.*/,
  // ffmpeg-static resolves its binary path relative to its own files; bundling it
  // breaks that path, so keep it external to the server build.
  serverExternalPackages: ['ffmpeg-static'],
  experimental: {
    // With middleware present, Next buffers the request body and caps it at 10 MB
    // by default — which truncates video uploads mid-stream and breaks formData().
    // Raise it to match MAX_VIDEO_BYTES in src/lib/uploads.js (300 MB).
    middlewareClientMaxBodySize: 300 * 1024 * 1024,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|mov|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },
};

export default nextConfig;
