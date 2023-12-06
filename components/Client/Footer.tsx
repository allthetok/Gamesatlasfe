import React from 'react'
import Link from 'next/link'
import LinkIcon from '@mui/icons-material/Link'
import { Typography } from '@mui/material'
import { LinkIconSx, TypographySx } from '../../sxstyling/styles'
import './Footer.css'

const Footer = () => {
	return (
		<footer className='position-footer'>
			<div className='footer-background'></div>
			<Typography variant='body2' color='text.secondary' align='center' sx={TypographySx}>
				{'Copyright © '}
				<Link target='_blank' rel='noopener noreferrer' href='https://github.com/allthetok' className='git-link'>
					<LinkIcon sx={LinkIconSx} />
				</Link>
				{' '}Allen Tokjuman{' - '}
				{new Date().getFullYear()}
			</Typography>
		</footer>
	)
}

export { Footer }
