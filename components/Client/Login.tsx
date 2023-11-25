'use client'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import './Login.css'
import axios from 'axios'

const Login = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (email === '' && password === '') {
			setError('Must fill both email and password')
			return
		}
		const resolveUserConfig = {
			method: 'post',
			url: 'http://localhost:5000/api/resolveUser',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'email': email,
				'provider': 'GamesAtlas'
			}
		}
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
				console.log(err)
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
			console.log('Error :', signInResponse)
			setError('Incorrect password')
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

	const handlePasswordChange = (e: any) => {
		setPassword(e.currentTarget.value)
	}

	return (
		<div className='login-wrap'>
			<div className='background-image background'></div>
			<header className='logo-header'>
				<div>
					<Image className='logo-image' src='/logo-highres-circle.png' width={132.14} height={95} alt='GamesAtlas Logo' />
				</div>
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
							<div className='form-fill'>
								<div></div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='existing-email' id='existing-email' type='text' autoComplete='new-password' value={email} onChange={handleEmailChange} />
										<label>Email</label>
										<span>Email</span>
									</div>
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
						<div className={email !== '' && password!== '' ? 'enter-wrap' : 'enter-disabled-wrap'}>
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