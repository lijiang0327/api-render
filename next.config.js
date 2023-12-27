/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.punkapi.com',
                pathname: '/v2/**',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
