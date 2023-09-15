/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { FormEventHandler, LegacyRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import './Search.css'

type SearchProps = {
	handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
	textInput: LegacyRef<HTMLInputElement> | undefined,
	handleUserLogout: (e: any) => void
}

const Search = () => {

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						{/* <IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
						>
							<HomeIcon />
							{/* <MenuIcon /> */}
						{/* </IconButton> */}
						{/* <Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ display: { xs: 'none', sm: 'block' } }}
						> */}
						{/* <a className='homeText'>Games Atlas</a> */}
						{/* </Typography> */}
						<div className='search-wrap'>
							<form className='searchBar'>
								<input type='text' required placeholder='Search...' />
								<button className='searchBtn'>
									<span>Search</span>
								</button>
							</form>
						</div>
						<Box sx={{ flexGrow: 1 }} />
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	)
}

export { Search }