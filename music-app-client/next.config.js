/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
