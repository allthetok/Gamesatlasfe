/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		PROD_API_ENDPOINT: process.env.PROD_API_ENDPOINT
	}
}

module.exports = nextConfig
