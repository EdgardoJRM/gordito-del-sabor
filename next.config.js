/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/el-sabor-de-papa',
        destination: '/delantal-el-gordito',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
