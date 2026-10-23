import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  transpilePackages: ['@tracker/shared'],
  images: { remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }] },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
