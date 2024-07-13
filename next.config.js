/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: false,
  webpack: (config) => {
    // reactStrictMode: false,
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = {
  basePath: "/AppTree",
  assetPrefix: "/AppTree",
  ...nextConfig,
  env: {
    App_URL: "https://sabz.khomeinishahr.ir/api/v1",
    APP_NAME: "پلاک درختی",
    APP_PROVIDER: "شهرداری نجف آباد",
  },
};
