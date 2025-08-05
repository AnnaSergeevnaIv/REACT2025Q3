/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
    images: {
    remotePatterns: [new URL('https://vignette.wikia.nocookie.net/**')],
  },
  experimental: {
    esmExternals: 'loose'
  }
}
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);