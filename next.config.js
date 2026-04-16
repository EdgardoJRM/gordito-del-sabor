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
        source: '/tienda',
        destination: '/recetario',
        permanent: false,
      },
      {
        source: '/carrito',
        destination: '/recetario',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
