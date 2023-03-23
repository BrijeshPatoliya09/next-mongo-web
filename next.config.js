/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: "mongodb+srv://brijesh:brijesh@cluster0.aftqzqp.mongodb.net/ecom-web-store?retryWrites=true&w=majority",
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/bj09',
    JWT_SECRET: "afuyguyasgfigaisFG25165145691",
    STRIPE_PUBLISHER_KEY: "pk_test_51Mny8dSH5xxhNkuJvlaLYCP6ylMbRcbz7JN6P66OiBjCKvjIVX8kdkBqWyF61nNCHnAKBI6ijIJCUd61Kz3TmQHR00CaZrliF5",
    STRIPE_SECRET_KEY: "sk_test_51Mny8dSH5xxhNkuJEwuNAVZVE5dunyperQdfx05leWSeG1E2ASSoaXdpE8mpay4ixrLXBJnjj57G0MUTDrlimAbH00rDkO2fqn"
  },
  reactStrictMode: false,
}

module.exports = nextConfig
