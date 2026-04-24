/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*", "*.replit.dev", "*.repl.co", "*.replit.app"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "www.google.com" }
    ]
  }
};

export default nextConfig;
