/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dwgwlmu6i/image/upload/**",
      },
    ],
  },
}

module.exports = nextConfig
