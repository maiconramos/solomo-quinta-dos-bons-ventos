const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const basePath = siteUrl
  ? new URL(siteUrl).pathname.replace(/\/$/, '')
  : '';
