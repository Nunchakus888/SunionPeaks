/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    distDir: 'out',
  } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    styledComponents: false,
  },
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;