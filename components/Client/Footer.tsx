import React from 'react'
import Link from 'next/link'
import LinkIcon from '@mui/icons-material/Link'
import { Typography } from '@mui/material'
import './Footer.css'

const Footer = () => {
	return (
		<div>
			<div className='footer-background'></div>
			<Typography variant='body2' color='text.secondary' align='center' sx={{ width: '100%', bottom: '1.25%', position: 'fixed', fontSize: '1rem', color: '#daddeb', verticalAlign: 'middle' }}>
				{'Copyright © '}
				<Link target='_blank' rel='noopener noreferrer' href='https://github.com/allthetok' className='git-link'>
					<LinkIcon sx={{ verticalAlign: 'bottom', '&hover': { cursor: 'pointer' } }} />
				</Link>
				{' '}Allen Tokjuman{' - '}
				{new Date().getFullYear()}
			</Typography>
		</div>
	)
}

export { Footer }
