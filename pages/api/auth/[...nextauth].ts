/* eslint-disable indent */
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
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/loginOAuthUser',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'email': profile.email,
						'emailverified': profile.email_verified,
						'username': profile.name,
						'image': profile.picture,
						'externalId': profile.sub
					}
				}
				const internalUser = await axios(oauthProviderConfig)
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
				return {
					email: profile.email,
					name: profile.name,
					image: profile.picture,
					id: internalUser?.id,
					externalId: profile.sub
				}
			}
		}
		),
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			profile: async function(profile) {
				console.log(profile)
				const oauthProviderConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/loginOAuthUser',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'email': profile.email,
						'emailverified': false,
						'username': profile.display_name,
						'image': profile.images.length !== 0 ? profile.images[0] : '',
						'externalId': profile.id
					}
				}
				const internalUser = await axios(oauthProviderConfig)
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
				return {
					email: profile.email,
					name: profile.display_name,
					image: profile.images.length !== 0 ? profile.images[0] : '',
					id: internalUser?.id,
					externalId: profile.id
				}
			}
		}
		),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			//broken at the moment, fix discord provider and compose up, delete volume now that email is not unique
			profile: async function(profile) {
				const oauthProviderConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/loginOAuthUser',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'email': profile.email,
						'emailverified': profile.verified,
						'username': profile.global_name,
						'image': '',
						'externalId': profile.id
					}
				}
				const internalUser = await axios(oauthProviderConfig)
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
				return {
					email: profile.email,
					name: profile.global_name,
					image: '',
					id: internalUser?.id,
					externalId: profile.id
				}
			}
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/loginOAuthUser',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'email': profile.email,
						'emailverified': false,
						'username': profile.name,
						'image': profile.avatar_url,
						'externalId': profile.id
					}
				}
				const internalUser = await axios(oauthProviderConfig)
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
				return {
					email: profile.email,
					name: profile.name,
					image: profile.avatar_url,
					id: internalUser?.id,
					externalId: profile.id
				}
			}
		}),
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID as string,
			clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
			profile: async function(profile) {
				console.log(profile)
				const oauthProviderConfig = {
					method: 'post',
					url: 'http://localhost:5000/api/loginOAuthUser',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'email': profile.email,
						'emailverified': false,
						'username': profile.preferred_name,
						'image': profile.picture,
						'externalId': profile.sub
					}
				}
				const internalUser = await axios(oauthProviderConfig)
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
				return {
					email: profile.email,
					name: profile.preferred_name,
					image: profile.picture,
					id: internalUser?.id,
					externalId: profile.sub
				}
			}
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
			// async authorize(credentials) {
			authorize: async (credentials) => {
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
				return userObj
			}
		})
	],
	pages: {
		signIn: '/signin'
	},
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60,
		updateAge: 60 * 60
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			return {
				...token,
				...user
			}
		},
		session: async function({ session, token }) {
			return { ...session,
				user: {
					...session.user,
					id: token.sub,
					externalId: token.externalId ? token.externalId : null,
					name: token.name,
					token: {
						exp: token.exp,
						iat: token.iat,
						jti: token.jti
					}
				},
			}
		},
	},
	// events: {}
}

export default NextAuth(options)
