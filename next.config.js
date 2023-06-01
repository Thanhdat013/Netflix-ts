/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pass the modules you world like to see transpiled
  transpilePackages: [
    "@acme/ui",
    "lodash-es",
    "@stripe/firestore-stripe-payments",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
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
