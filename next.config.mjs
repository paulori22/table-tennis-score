/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
