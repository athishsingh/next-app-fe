/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: [
      "as2.ftcdn.net",
      "atlas-content-cdn.pixelsquid.com",
      "nymbleup-learning-management.s3.amazonaws.com",
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
