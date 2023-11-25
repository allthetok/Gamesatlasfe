'use client'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import './Login.css'

const Signup = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [verPassword, setVerPassword] = useState('')

	// const session = useSession()
	// if (session) {
	// 	router.push('/')
	// }
	// const handleSubmit = async (e: any) => {
	// 	e.preventDefault()
	// 	const data = new FormData(e.currentTarget)
	// 	console.log(data)
	// 	const signInResponse = await signIn('credentials', {
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 		redirect: false,
	// 	})

	// 	if (signInResponse && !signInResponse.error) {
	// 		router.push('/')
	// 	}
	// 	else {
	// 		console.log('Error :', signInResponse)
	// 		setError('Email or password incorrect')
	// 	}
	// }

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (password !== verPassword) {
			console.log('Error on matching passwords')
			setError('Passwords do not match')
		}
		else {
			const signInResponse = await signIn('credentials', {
				email: email,
				password: password,
				redirect: false,
				// HERE WE CAN UPDATE AND PASS IN WHETHER WE ARE SIGNING IN OR SIGNING UP
				// newUser: false
			})

			if (signInResponse && !signInResponse.error) {
				router.push('/')
			}
			else {
				console.log('Error :', signInResponse)
				setError('Invalid email or password')
			}
		}
	}

	const handleEmailChange = (e: any) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasswordChange = (e: any) => {
		setPassword(e.currentTarget.value)
	}

	const handleUsernameChange = (e: any) => {
		setUsername(e.currentTarget.value)
	}

	const handleVerPasswordChange = (e: any) => {
		setVerPassword(e.currentTarget.value)
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
										<input name='username' id='username' type='text' value={username} onChange={handleUsernameChange} />
										<label>Username</label>
										<span>Username</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='email' id='email' type='text' value={email} onChange={handleEmailChange} />
										<label>Email</label>
										<span>Email</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='password' id='pass' type='password' autoComplete='off' value={password} onChange={handlePasswordChange}/>
										<label>Password</label>
										<span>Password</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='passwordver' id='passver' type='password' autoComplete='off' value={verPassword} onChange={handleVerPasswordChange}/>
										<label>Verify Password</label>
										<span>Verify Password</span>
									</div>
								</div>
							</div>
						</form>
						<div className='enter-wrap'>
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

export { Signup }