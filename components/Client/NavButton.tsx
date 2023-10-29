import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Box, Button } from '@mui/material'
import { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx } from '../../sxstyling/styles'
import './GameDtl.css'

type NavButtonProps = {
	link: string,
	formatName: string,
	gameID: number
}
const NavButton = ({ link, formatName, gameID }: NavButtonProps) => {
	const currentPath = usePathname()
	return (
		<Box sx={currentPath === link ? BoxActiveSx : BoxSx}>
			{/* <Link href={`${link}/id=${gameID}`}> */}
			{/* <Link href={link}> */}
			<Link href={`${link}?id=${gameID}`}>
				<Button sx={currentPath === link ? ButtonActiveSx : ButtonSx}>
					{formatName}
				</Button>
			</Link>
			{/* <Link href={`${link}`}>
				<Button sx={currentPath === link ? ButtonActiveSx : ButtonSx}>
					{formatName}
				</Button>
			</Link> */}
		</Box>
	)
	// <Link href={gameSearch !== '' ? `/game/?search=${gameSearch}` : ''}>
	// 									<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 								</Link>
}

export { NavButton }