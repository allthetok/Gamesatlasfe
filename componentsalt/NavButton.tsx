import React from 'react'
import { Box, Button } from '@mui/material'
import { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx } from '../sxstyling/styles'
import './GameDtl.css'

type NavButtonProps = {
	tabSelect: string
	handleActiveChange: (tabSelected: string) => void,
	src: string,
	formatName: string
}
const NavButton = ({ tabSelect, handleActiveChange, src, formatName }: NavButtonProps) => {
	return (
		<Box
			sx={tabSelect === src ? BoxActiveSx : BoxSx}>
			<Button
				sx={tabSelect === src ? ButtonActiveSx : ButtonSx}
				onClick={() => handleActiveChange(src)}>
				{formatName}
			</Button>
		</Box>
	)
}

export { NavButton }