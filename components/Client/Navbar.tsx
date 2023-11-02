/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Navbar.css'

const Navbar = () => {
	return (
		<nav>
			<div className='nav-wrapper'>
				<img className='logo-img' src='/logo-highres-circle.png' alt='Logo'/>
				<div>
					Recommendations
				</div>
				<div>
					Advanced Search
				</div>
				<div>
					Explore
				</div>
				<div>
					User Profile
				</div>
			</div>
		</nav>
	)
}

export { Navbar }