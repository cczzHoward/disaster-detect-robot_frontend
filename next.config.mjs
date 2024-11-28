/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HTTP_URL: "http://26.237.202.99:8000",
    WEBSOCKET_URL: "ws://26.237.202.99:8000"
  },
};

export default nextConfig;
