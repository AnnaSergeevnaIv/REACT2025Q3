/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
    images: {
    remotePatterns: [new URL('https://vignette.wikia.nocookie.net/**')],
  },
}
 
export default nextConfig