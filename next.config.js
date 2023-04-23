/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  redirects: async () => [
    {
      source: "/product-list",
      destination: "/product-list/1",
      permanent: true
    },
    {
      source: "/",
      destination: "/product-list/1",
      permanent: true
    }
  ]
};

module.exports = nextConfig;
