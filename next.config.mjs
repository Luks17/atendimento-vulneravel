/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module:
          /typeorm\/.+\/[PlatformTools\.js|ReactNativeDriver\.js|DirectoryExportedClassesLoader\.js|ImportUtils\.js]/,
      },
      {
        module: /app-root-path|ConnectionOptionsReader/,
        message: /the request of a dependency is an expression/,
      },
    ];

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2", "@node-rs/bcrypt"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
