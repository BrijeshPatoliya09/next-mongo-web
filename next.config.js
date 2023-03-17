/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: "mongodb+srv://brijesh:brijesh@cluster0.aftqzqp.mongodb.net/ecom-web-store?retryWrites=true&w=majority",
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/bj09',
    JWT_SECRET: "afuyguyasgfigaisFG25165145691"
  },
  reactStrictMode: false,
}

module.exports = nextConfig
