'use client'
import React, { useState } from 'react'
import axios from 'axios'
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

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (password !== verPassword) {
			setError('Passwords do not match')
		}
		else if (email === '' && username === '') {
			setError('Must provide either an email or username')
		}
		else {
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
			if (resolveUser.userExists === true) {
				setError(`A user with email: ${email} already exists`)
				return
			}
			const signInResponse = await signIn('credentials', {
				email: email,
				password: password,
				redirect: false,
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
							<h5 className='login-title'>Signup to GamesAtlas</h5>
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
										<input name='new-email'	id='new-email' type='email' autoComplete='new-password' value={email} onChange={handleEmailChange} />
										<label>Email</label>
										<span>Email</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='new-username' id='new-username' type='text' autoComplete='new-password' value={username} onChange={handleUsernameChange} />
										<label>Username</label>
										<span>Username</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='new-password' id='new-password' autoComplete='new-password' type='password' value={password} onChange={handlePasswordChange}/>
										<label>Password</label>
										<span>Password</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='new-passwordver' id='new-passwordver' type='password' autoComplete='off' value={verPassword} onChange={handleVerPasswordChange}/>
										<label>Verify Password</label>
										<span>Verify Password</span>
									</div>
								</div>
							</div>
						</form>
						<div className={(email !== '' || username !== '') && password !== '' && verPassword !== '' ? 'enter-wrap' : 'enter-disabled-wrap'}>
							<button type='submit' className='enter-btn-wrap' onClick={handleSubmit}>
								<SvgIcon fontSize='large'>
									<ArrowForwardIcon />
								</SvgIcon>
							</button>
						</div>
						<div className='alt-actions'>
							<span className='link-to-alt first-child'>
								<Link href='/signin'>
									Back to Login
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