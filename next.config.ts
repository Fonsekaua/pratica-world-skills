import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-estudos-joao.shop",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
