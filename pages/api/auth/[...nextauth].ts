/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username:',
					type: 'text',
					placeholder: 'Enter Username'
				},
				password: {
					label: 'Password:',
					type: 'password',
					placeholder: 'Enter Password'
				}
			},
			async authorize(credentials) {
				//retrieve credentials from database configuration/providers/credentials
				const user = { id: '42', name: 'Allen', password: 'tempuser' }

				if (credentials?.username === user.name && credentials?.password === user.password) {
					return user
				}
				else {
					return null
				}
			}
		})
	]
}

export default NextAuth(options)

// const handler = NextAuth(options)

// export { handler as GET, handler as POST }
