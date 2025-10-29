/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper encoding for Vietnamese characters
  async headers() {
    return [
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
