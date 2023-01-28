/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? 'build-dev' : 'build',
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trending',
        permanent: true
      }
    ];
  }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

// const withTM = require('next-transpile-modules')(['connectkit']);

// module.exports = withTM({
//   reactStrictMode: true
// });

module.exports = withBundleAnalyzer(nextConfig);
