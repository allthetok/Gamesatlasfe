/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Checkbox, FormControlLabel } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import { createUserEmailConfig, createUserNameConfig, regexValidEmail } from '../../helpers/fctns'
import './Login.css'

const Login = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const [loginMethod, setLoginMethod] = useState('email')

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (email === '' && password === '' && loginMethod === 'email') {
			setError('Must fill both email and password')
			return
		}
		else if (username === '' && password === '' && loginMethod === 'username') {
			setError('Must fill both username and password')
			return
		}
		else if (loginMethod === 'email' && !regexValidEmail(email)) {
			setError('Invalid email format')
			return
		}
		if (loginMethod === 'username') {
			const retrieveUserEmailConfig = createUserNameConfig('post', 'usernameEmail', username, 'GamesAtlas')
			const userEmail = await axios(retrieveUserEmailConfig)
				.then((response: AxiosResponse) => {
					if (response.status === 200) {
						return {
							email: response.data.email
						}
					}
					else {
						return {
							email: null
						}
					}
				})
				.catch((err: AxiosError) => {
					return {
						email: null
					}
				})
			if (userEmail.email === null) {
				setError(`A user with name: ${username} does not exist`)
				return
			}
			const signInResponse = await signIn('credentials', {
				email: userEmail.email,
				password: password,
				redirect: false
			})
			if (signInResponse && !signInResponse.error) {
				router.push('/')
			}
			else {
				setError('Incorrect password')
			}
		}
		else {
			const resolveUserConfig = createUserEmailConfig('post', 'resolveUser', email, 'GamesAtlas')
			const resolveUser = await axios(resolveUserConfig)
				.then((response: AxiosResponse) => {
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
				.catch((err: AxiosError) => {
					return {
						userExists: false
					}
				})
			if (resolveUser.userExists === false) {
				setError(`A user with email: ${email} does not exist`)
				return
			}

			const signInResponse = await signIn('credentials', {
				email: email,
				password: password,
				redirect: false
			})
			if (signInResponse && !signInResponse.error) {
				router.push('/')
			}
			else {
				setError('Incorrect password')
			}
		}
	}

	const handleGoogle = () => {
		signIn('google', { callbackUrl: '/' })
	}
	const handleSpotify = () => {
		signIn('spotify', { callbackUrl: '/' })
	}
	const handleDiscord = () => {
		signIn('discord', { callbackUrl: '/' })
	}
	const handleGithub = () => {
		signIn('github', { callbackUrl: '/' })
	}
	const handleTwitch = () => {
		signIn('twitch', { callbackUrl: '/' })
	}

	const handleEmailChange = (e: any) => {
		setEmail(e.currentTarget.value)
	}

	const handleUsernameChange = (e: any) => {
		setUsername(e.currentTarget.value)
	}

	const handlePasswordChange = (e: any) => {
		setPassword(e.currentTarget.value)
	}

	return (
		<div className='login-wrap'>
			<div className='background-image background'></div>
			<header className='logo-header'>
				<div>
					<Link href='/'>
						<Image className='logo-image' src='/logo-highres-circle.png' width={132.14} height={95} alt='GamesAtlas Logo' />
					</Link>				</div>
			</header>
			<div className='form-wrapper'>
				<div className='form-div'>
					<div className='form-inner'>
						<form onSubmit={handleSubmit}>
							<h5 className='login-title'>Log in</h5>
							{error ? (
								<div className='error-credentials'>
									<span>Error: {error}</span>
								</div>
							)
								: <></>
							}
							<div className='login-method'>
								<FormControlLabel
									value='email'
									control={<Checkbox checked={loginMethod === 'email'} onChange={() => {
										setLoginMethod('email')
										setUsername('')
									}}/>}
									label='Email'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='username'
									control={<Checkbox checked={loginMethod === 'username'} onChange={() => {
										setLoginMethod('username')
										setEmail('')
									}}/>}
									label='Username'
									labelPlacement='start'
								/>
							</div>
							<div className='form-fill'>
								<div></div>
								<div className='field-area'>
									{
										loginMethod === 'email' ?
											<div className='field-input field field-wrapper'>
												<input name='existing-email' id='existing-email' type='text' autoComplete='new-password' value={email} onChange={handleEmailChange} />
												<label>Email</label>
												<span>Email</span>
											</div>
											:
											<div className='field-input field field-wrapper'>
												<input name='existing-username' id='existing-username' type='text' autoComplete='new-password' value={username} onChange={handleUsernameChange} />
												<label>Username</label>
												<span>Username</span>
											</div>
									}
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='existing-password' id='existing-pass' type='password' autoComplete='new-password' value={password} onChange={handlePasswordChange}/>
										<label>Password</label>
										<span>Password</span>
									</div>
								</div>
							</div>
						</form>
						<div className='altauth-area'>
							<button className='google' onClick={handleGoogle}>
								<div className='logo-btn-wrap'>
									<Image src='/icons8-google-48.png' width={18} height={18} alt='Google Logo'/>
								</div>
							</button>
							<button className='spotify' onClick={handleSpotify}>
								<div className='logo-btn-wrap'>
									<Image src='/icons8-spotify-30.png' width={18} height={18} alt='Spotify Logo'/>
								</div>
							</button>
							<button className='discord' onClick={handleDiscord}>
								<div className='logo-btn-wrap'>
									<Image src='/icons8-discord-24.png' width={18} height={18} alt='Discord Logo'/>
								</div>
							</button>
							<button className='github' onClick={handleGithub}>
								<div className='logo-btn-wrap'>
									<Image src='/icons8-github-30.png' width={18} height={18} alt='Github Logo'/>
								</div>
							</button>
							<button className='twitch' onClick={handleTwitch}>
								<div className='logo-btn-wrap'>
									<Image src='/icons8-twitch-50.png' width={18} height={18} alt='Twitch Logo'/>
								</div>
							</button>
						</div>
						<div className={(loginMethod === 'email' && email !== '' && password!== '') || (loginMethod === 'username' && username !== '' && password!== '')  ? 'enter-wrap' : 'enter-disabled-wrap'}>
							<button type='submit' className='enter-btn-wrap' onClick={handleSubmit}>
								<SvgIcon fontSize='large'>
									<ArrowForwardIcon />
								</SvgIcon>
							</button>
						</div>
						<div className='alt-actions'>
							<span className='link-to-alt first-child'>
								<Link href='/forgotpass'>
										Forgot Password
								</Link>
							</span>
							<span className='link-to-alt'>
								<Link href='/signup'>
										Create Account
								</Link>
							</span>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export { Login }