/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper encoding for Vietnamese characters
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/json; charset=utf-8",
          },
        ],
      },
      {
        source: "/(.*\\.html|/)$",
        headers: [
          {
            key: "Content-Type",
            value: "text/html; charset=utf-8",
          },
        ],
      },
      {
        source: "/(.*\\.css)$",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
