'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import './Login.css'

const Login = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		const signInResponse = await signIn('credentials', {
			email: data.get('email'),
			password: data.get('password'),
			redirect: false,
		})

		if (signInResponse && !signInResponse.error) {
			router.push('/')
		}
		else {
			console.log('Error :', signInResponse)
			setError('Email or password incorrect')
		}
	}

	const handleGoogle = () => {
		signIn('google')
	}
	const handleSpotify = () => {
		signIn('spotify')
	}
	const handleDiscord = () => {
		signIn('discord')
	}
	const handleGithub = () => {
		signIn('github')
	}
	const handleTwitch = () => {
		signIn('twitch')
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
					<form onSubmit={handleSubmit}>
						<div className='form-inner'>
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
										<input name='email' id='email' type='text' />
										<label>Email</label>
										<span>Email</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='password' id='pass' type='password' autoComplete='off'/>
										<label>Password</label>
										<span>Password</span>
									</div>
								</div>
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
							</div>
							<div className='enter-wrap'>
								<button className='enter-btn-wrap' onClick={handleSubmit}>
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
					</form>
				</div>
			</div>
		</div>
	)
}

export { Login }