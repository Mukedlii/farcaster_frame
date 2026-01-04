/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The app directory is enabled by default in Next.js 14; remove
  // unused experimental flags to avoid warnings.
  // Ensure that Next.js does not try to transpile the frames.js package for serverless targets
  transpilePackages: ["frames.js"],
};

module.exports = nextConfig;