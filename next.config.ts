import type { NextConfig } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
const basePath = (siteUrl && !siteUrl.startsWith('file://')) 
  ? new URL(siteUrl).pathname.replace(/\/$/, '') 
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(basePath && { basePath }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
