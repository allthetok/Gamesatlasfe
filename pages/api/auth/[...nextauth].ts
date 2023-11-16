/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import TwitchProvider from 'next-auth/providers/twitch'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID as string,
			clientSecret: process.env.TWITCH_CLIENT_SECRET as string
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email:',
					type: 'email',
					placeholder: 'example@example.com'
				},
				password: {
					label: 'Password:',
					type: 'password'
				}
			},
			async authorize(credentials) {
				const userConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/login',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'email': credentials?.email,
						'password': credentials?.password
					}
				}

				const userObj = await axios(userConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								email: response.data.email,
								username: response.data.username
							}
						}
						else {
							return null
						}
					})
					.catch((err: any) => {
						console.log(err)
						return null
					})
				console.log(userObj)
				return userObj
			}
		})
	],
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.sub,
				name: token.name,
				token: token
			},
		}),
	},
}

export default NextAuth(options)
