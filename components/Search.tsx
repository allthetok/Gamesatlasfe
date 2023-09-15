/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { FormEventHandler, LegacyRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import HomeIcon from '@mui/icons-material/Home'
import './Search.css'

type SearchProps = {
	handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
	textInput: LegacyRef<HTMLInputElement> | undefined,
	handleUserLogout: (e: any) => void
}

const Search = () => {

	return (
		<Box sx={{ flexGrow: 1, minWidth: '100%' }}>
			<AppBar position="static" sx={{ backgroundColor: '#1f2328' }}>
				<Toolbar>
					<Box sx={{ flexGrow: 0.5 }}/>
					<div className='search-wrap'>
						<form className='search-bar'>
							<input type='text' required placeholder='Search...' />
							<IconButton size='medium'>
								<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
							</IconButton>
						</form>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export { Search }