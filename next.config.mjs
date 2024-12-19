/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HTTP_URL: "http://26.244.63.82:8000",
    WEBSOCKET_URL: "ws://26.244.63.82:8000"
  },
};

export default nextConfig;
