/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.auth0.com'
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/:slug",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/api/save",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        source: "/api/conversations",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/save",
        destination: "/api/conversations",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/explore",
        destination: "https://sharegpt.com",
        permanent: false,
      },
      {
        source: "/extension",
        destination:
          "https://chrome.google.com/webstore/detail/sharegpt/daiacboceoaocpibfodeljbdfacokfjb?hl=en&authuser=0",
        permanent: false,
      },
      {
        source: "/shortcut",
        destination:
          "https://www.icloud.com/shortcuts/7d4712f9ca6e4c60aeb5cf813873dcd3",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/domeccleston/sharegpt",
        permanent: false,
      },
      {
        source: "/mentions",
        destination:
          "https://twitter.com/search?q=sharegpt.com%20-from%3Asteventey&src=typed_query&f=top", // show ShareGPT mentions on Twitter that are not from @steventey
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "sharegpt.com",
          },
        ],
        destination: "https://sharegpt.com",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "sharegpt.com",
          },
        ],
        destination: "https://sharegpt.com/c/:path*",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
