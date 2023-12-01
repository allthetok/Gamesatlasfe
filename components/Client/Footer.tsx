import React from 'react'
import Link from 'next/link'
import LinkIcon from '@mui/icons-material/Link'
import { Typography } from '@mui/material'
import './Footer.css'

const Footer = () => {
	return (
		<footer className='position-footer'>
			<div className='footer-background'></div>
			<Typography variant='body2' color='text.secondary' align='center' sx={{ width: '100%', height: '35px', fontSize: '1rem', color: '#daddeb', paddingTop: '10px', verticalAlign: 'middle', background: 'linear-gradient(105deg, rgba(39,38,43,1) 0%, rgba(66,66,66,1) 35%, rgba(45,56,59,1) 100%)' }}>
				{'Copyright © '}
				<Link target='_blank' rel='noopener noreferrer' href='https://github.com/allthetok' className='git-link'>
					<LinkIcon sx={{ verticalAlign: 'bottom', '&hover': { cursor: 'pointer' } }} />
				</Link>
				{' '}Allen Tokjuman{' - '}
				{new Date().getFullYear()}
			</Typography>
		</footer>
	)
}

export { Footer }
