/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createUserEmailConfig, createUserPatchConfig, regexValidEmail } from '../../helpers/fctns'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import './Login.css'

const Forgot = () => {
	const [error, setError] = useState<string | null>(null)
	const [verificationStage, setVerificationStage] = useState('email')

	const [email, setEmail] = useState('')
	const [passcode, setPasscode] = useState('')
	const [password, setPassword] = useState('')
	const [verPassword, setVerPassword] = useState('')
	const [userId, setUserId] = useState('')
	const [profileId, setProfileId] = useState('')
	const router = useRouter()

	const handleEmailSubmit = async (e: any) => {
		e.preventDefault()

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
		else {
			resolveUserConfig.url = 'http://localhost:5000/api/user/verificationCode'
			await axios(resolveUserConfig)
				.then((response: AxiosResponse) => {
					if (response.status === 200) {
						setUserId(response.data.userid)
						setProfileId(response.data.profileid)
						setVerificationStage('emailcode')
						setError('')
					}
				})
		}
	}

	const handlePasscodeSubmit = async (e: any) => {
		e.preventDefault()
		const retrieveCodeConfig = createUserEmailConfig('post', 'resolveCode', email, '')
		await axios(retrieveCodeConfig)
			.then((response: any) => {
				if (response.data.verificationcode === passcode) {
					setVerificationStage('password')
					setError('')
				}
				else {
					setError('Incorrect passcode entered')
				}
			})
	}

	const handlePasswordSubmit = async (e: any) => {
		e.preventDefault()

		if (password !== verPassword) {
			setError('Passwords do not match')
			return
		}
		const patchPasswordConfig = createUserPatchConfig('patch', 'userDetails', userId, profileId, 'GamesAtlas', 'password', '', '', password)
		await axios(patchPasswordConfig)
			.then((response: any) => {
				response.status === 200 ? router.push('/signin') : setError('Failed to update password')
			})
	}

	const handleEmailChange = (e: any) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasscodeChange = (e: any) => {
		setPasscode(e.currentTarget.value)
	}

	const handlePasswordChange = (e: any) => {
		setPassword(e.currentTarget.value)
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
					{verificationStage === 'email' ?
						<div className='form-inner'>
							<form onSubmit={handleEmailSubmit}>
								<h5 className='login-title'>Reset Password</h5>
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
								</div>
							</form>
							<div className={email !== '' && regexValidEmail(email) ? 'enter-wrap' : 'enter-disabled-wrap'}>
								<button type='submit' className='enter-btn-wrap' onClick={handleEmailSubmit}>
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
						</div> : <></>
					}
					{verificationStage === 'emailcode' ?
						<div className='form-inner'>
							<form onSubmit={handlePasscodeSubmit}>
								<h5 className='login-title'>Enter Passcode Sent to Email</h5>
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
											<input name='new-email'	id='new-email' type='email' autoComplete='new-password' value={passcode} onChange={handlePasscodeChange} />
											<label>Passcode</label>
											<span>Passcode</span>
										</div>
									</div>
								</div>
							</form>
							<div className={passcode !== '' ? 'enter-wrap' : 'enter-disabled-wrap'}>
								<button type='submit' className='enter-btn-wrap' onClick={handlePasscodeSubmit}>
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
						</div> : <></>
					}
					{verificationStage === 'password' ?
						<div className='form-inner'>
							<form onSubmit={handlePasswordSubmit}>
								<h5 className='login-title'>Enter New Password</h5>
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
							<div className={password.length === verPassword.length ? 'enter-wrap' : 'enter-disabled-wrap'}>
								<button type='submit' className='enter-btn-wrap' onClick={handlePasswordSubmit}>
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
						</div> : <></>
					}
				</div>
			</div>
		</div>
	)
}

export { Forgot }