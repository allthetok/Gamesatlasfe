import React from 'react'
// import { Link } from '@mui/icons-material'
import LinkIcon from '@mui/icons-material/Link'
import { Typography } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
	return <Typography variant='body2' color='text.secondary' align='center' sx={{ bottom: '2.5%', left: '47.93%', position: 'fixed', fontSize: '1rem', color: '#daddeb', verticalAlign: 'middle' }}>
		{'Copyright © '}

		<Link target="_blank" rel="noopener noreferrer" href='https://github.com/allthetok' className=''>
			<LinkIcon sx={{ verticalAlign: 'bottom', '&hover': { cursor: 'pointer' } }}>
			</LinkIcon>
		</Link>
		{' '}
		{/* <Link color='inherit' href='https://github.com/allthetok' sx={{ verticalAlign: 'bottom', '&hover': { cursor: 'pointer' } }}>
            Allen Tokjuman
		</Link>{' '} */}
		Allen Tok{'. '}
		{new Date().getFullYear()}
	</Typography>
}

export { Footer }
