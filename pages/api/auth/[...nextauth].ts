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
import { createFullSignUpConfig, createLoginConfig, createOAuthConfig, createUserEmailConfig } from '../../../helpers/fctns'



export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = createOAuthConfig('post', 'loginOAuthUser', profile.email, profile.email_verified, profile.name, profile.picture, profile.sub, 'Google')
				const internalUser = await axios(oauthProviderConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								email: response.data.email,
								username: response.data.username,
								provider: response.data.provider,
								profileid: response.data.profileid
							}
						}
						else {
							return null
						}
					})
					.catch((err: any) => {
						return null
					})
				return {
					id: internalUser?.id,
					email: profile.email,
					name: profile.name,
					image: profile.picture,
					externalId: profile.sub,
					provider: internalUser?.provider,
					profileid: internalUser?.profileid
				}
			}
		}
		),
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = createOAuthConfig('post', 'loginOAuthUser', profile.email, false, profile.display_name, profile.images.length !== 0 ? profile.images[0].url : '', profile.id, 'Spotify')
				const internalUser = await axios(oauthProviderConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								email: response.data.email,
								username: response.data.username,
								provider: response.data.provider,
								profileid: response.data.profileid
							}
						}
						else {
							return null
						}
					})
					.catch((err: any) => {
						return null
					})
				return {
					email: profile.email,
					name: profile.display_name,
					image: profile.images.length !== 0 ? profile.images[0].url : '',
					id: internalUser?.id,
					externalId: profile.id,
					provider: internalUser?.provider,
					profileid: internalUser?.profileid
				}
			}
		}
		),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = createOAuthConfig('post', 'loginOAuthUser', profile.email, profile.verified, profile.global_name, `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`, profile.id, 'Discord')
				const internalUser = await axios(oauthProviderConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								email: response.data.email,
								username: response.data.username,
								provider: response.data.provider,
								profileid: response.data.profileid
							}
						}
						else {
							return null
						}
					})
					.catch((err: any) => {
						return null
					})
				return {
					email: profile.email,
					name: profile.global_name,
					image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
					id: internalUser?.id,
					externalId: profile.id,
					provider: internalUser?.provider,
					profileid: internalUser?.profileid
				}
			}
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = createOAuthConfig('post', 'loginOAuthUser', profile.email, false, profile.name, profile.avatar_url, profile.id, 'Github')
				const internalUser = await axios(oauthProviderConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								email: response.data.email,
								username: response.data.username,
								provider: response.data.provider,
								profileid: response.data.profileid
							}
						}
						else {
							return null
						}
					})
					.catch((err: any) => {
						return null
					})
				return {
					email: profile.email,
					name: profile.name,
					image: profile.avatar_url,
					id: internalUser?.id,
					externalId: profile.id,
					provider: internalUser?.provider,
					profileid: internalUser?.profileid
				}
			}
		}),
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID as string,
			clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
			profile: async function(profile) {
				const oauthProviderConfig = createOAuthConfig('post', 'loginOAuthUser', profile.email, false, profile.preferred_username, profile.picture, profile.sub, 'Twitch')
				const internalUser = await axios(oauthProviderConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								id: response.data.id,
								email: response.data.email,
								username: response.data.username,
								provider: response.data.provider,
								profileid: response.data.profileid
							}
						}
						else {
							return null
						}
					})
					.catch((err: any) => {
						return null
					})
				return {
					email: profile.email,
					name: profile.preferred_username,
					image: profile.picture,
					id: internalUser?.id,
					externalId: profile.sub,
					provider: internalUser?.provider,
					profileid: internalUser?.profileid
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
				username: {
					label: 'Username:',
					type: 'username',
				},
				password: {
					label: 'Password:',
					type: 'password'
				}
			},
			authorize: async (credentials) => {
				let userObj: any
				const resolveUserConfig = createUserEmailConfig('post', 'resolveUser', credentials?.email, 'GamesAtlas')
				const resolveUser = await axios(resolveUserConfig)
					.then((response: any) => {
						if (response.status === 200) {
							return {
								userExists: response.data.userExists
							}
						}
						else {
							return {
								userExists: false
							}
						}
					})
					.catch((err: any) => {
						return {
							userExists: false
						}
					})

				if (resolveUser.userExists) {
					const loginConfig = createLoginConfig('post', 'login', credentials?.email, credentials?.password, 'GamesAtlas')
					userObj = await axios(loginConfig)
						.then((response: any) => {
							if (response.status === 200) {
								return {
									id: response.data.id,
									email: response.data.email,
									username: response.data.username,
									emailVerified: response.data.emailVerified,
									provider: response.data.provider,
									profileid: response.data.profileid
								}
							}
							else {
								return null
							}
						})
						.catch((err: any) => {
							return null
						})
				}
				else {
					const signUpConfig = createFullSignUpConfig('post', 'createUser', credentials?.email, credentials?.username, credentials?.password, 'GamesAtlas')
					userObj = await axios(signUpConfig)
						.then((response: any) => {
							if (response.status === 200) {
								return {
									id: response.data.id,
									email: response.data.email,
									username: response.data.username,
									emailVerified: response.data.emailVerified,
									provider: response.data.provider,
									profileid: response.data.profileid
								}
							}
							else {
								return null
							}
						})
						.catch((err: any) => {
							return null
						})
				}
				return userObj
			},
		})
	],
	pages: {
		signIn: '/signin',
		newUser: '/signup'
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
					username: token.username ? token.username: null,
					emailVerified: (token.emailVerified === true || token.emailVerified === false) ? token.emailVerified : false,
					provider: token.provider ? token.provider : null,
					profileid: token.profileid ? token.profileid: null,
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
