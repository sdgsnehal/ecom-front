/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["images.pexels.com", "images.unsplash.com"],
  },
};

export default nextConfig;
