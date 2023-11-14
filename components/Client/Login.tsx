import React from 'react'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './Login.css'
import SvgIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

const Login = () => {
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
					<form>
						<div className='form-inner'>
							<h5 className='login-title'>Log in</h5>
							<div className='form-fill'>
								<div></div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='username' id='user' type='text' />
										<label>Username</label>
										<span>Username</span>
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
									<button className='google'>
										<div className='logo-btn-wrap'>
											<Image src='/icons8-google-48.png' width={18} height={18} alt='Google Logo'/>
										</div>
									</button>
									<button className='apple'>
										<div className='logo-btn-wrap'>
											<Image src='/icons8-apple-50.png' width={18} height={18} alt='Apple Logo'/>
										</div>
									</button>
									<button className='microsoft'>
										<div className='logo-btn-wrap'>
											<Image src='/icons8-microsoft-48.png' width={18} height={18} alt='Microsoft Logo'/>
										</div>
									</button>
									<button className='github'>
										<div className='logo-btn-wrap'>
											<Image src='/icons8-github-30.png' width={18} height={18} alt='Microsoft Logo'/>
										</div>
									</button>
									<button className='reddit'>
										<div className='logo-btn-wrap'>
											<Image src='/icons8-reddit-48.png' width={18} height={18} alt='Microsoft Logo'/>
										</div>
									</button>
								</div>
							</div>
							<div className='enter-wrap'>
								<button className='enter-btn-wrap'>
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