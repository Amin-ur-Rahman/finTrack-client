/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",

        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

// https://res.cloudinary.com/
