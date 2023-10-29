/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Box, Button } from '@mui/material'
import { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx } from '../../sxstyling/styles'
import './GameDtl.css'

type NavButtonProps = {
	link: string,
	formatName: string,
	gameID: number,
	searchterm: string
}

const NavButton = ({ link, formatName, gameID, searchterm }: NavButtonProps) => {
	let currentPath = usePathname()
	currentPath = usePathname()?.replace('/game/','') === searchterm ? '/game' : currentPath!.replace('/game','').replace(`/${searchterm}`,'').replace(`/${gameID.toString()}`,'')

	return (
		<Box sx={currentPath === link ? BoxActiveSx : BoxSx}>
			<Link href={ link !== '/game' ? `/game/${searchterm}${link}/${gameID}` : `/game/${searchterm}`} >
				<Button sx={currentPath === link ? ButtonActiveSx : ButtonSx}>
					{formatName}
				</Button>
			</Link>
		</Box>
	)
}

export { NavButton }