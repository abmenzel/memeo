const withPWA = require('next-pwa')({
	dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	output: "export",
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}

/** @type {import('next').NextConfig} */
const devConfig = {
	...nextConfig,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:8000/api/:path*',
			},
			{
				source: '/auth/:path*',
				destination: 'http://localhost:8000/auth/:path*',
			},
		]
	},
}

module.exports =
	process.env.NODE_ENV === 'development' ? devConfig : withPWA(nextConfig)
