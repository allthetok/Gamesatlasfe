import React from 'react'
import { Box, Button } from '@mui/material'
import { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx } from '../sxstyling/styles'
import Link from 'next/link'
import './GameDtl.css'
import { usePathname } from 'next/navigation'

type NavButtonProps = {
	link: string,
	formatName: string
}
const NavButton = ({ link, formatName }: NavButtonProps) => {
	const currentPath = usePathname()
	return (
		<Box sx={currentPath === link ? BoxActiveSx : BoxSx}>
			<Link href={link}>
				<Button sx={currentPath === link ? ButtonActiveSx : ButtonSx}>
					{formatName}
				</Button>
			</Link>
		</Box>
	)
}

export { NavButton }