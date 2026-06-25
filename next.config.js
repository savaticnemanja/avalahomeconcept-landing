/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // ffmpeg-static resolves its binary path relative to its own files; bundling it
  // breaks that path, so keep it external to the server build.
  serverExternalPackages: ['ffmpeg-static'],
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
