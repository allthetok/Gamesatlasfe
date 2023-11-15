/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import RedditProvider from 'next-auth/providers/reddit'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

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
				// const user = { id: '42', name: 'Allen', password: 'tempuser' }
				const userConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/login',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'username': credentials?.username,
						'password': credentials?.password
					}
				}

				const userObj = await axios(userConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								username: response.data.username,
							}
						}
						else {
							return {
								id: 0,
								username: 'None'
							}
						}
					})
					.catch((err: any) => {
						console.log(err)
						return {
							id: 0,
							username: 'None'
						}
					})
				return { id: userObj.id, name: userObj.username }

				// if (credentials?.username === user.name && credentials?.password === user.password) {
				// 	return user
				// }
				// else {
				// 	return null
				// }
			}
		})
	],
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.sub,
			},
		}),
	},
}

export default NextAuth(options)
