import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   // Handle canvas alias
  //   config.resolve = {
  //     ...config.resolve,
  //     alias: {
  //       ...config.resolve.alias,
  //       canvas: false
  //     }
  //   };
  //   return config;
  // }
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
