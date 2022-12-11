const withPWA = require('next-pwa')({
	dest: 'public',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}

module.exports =
	process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig)
