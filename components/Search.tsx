/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { FormEventHandler, LegacyRef, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import Link from 'next/link'
import './Search.css'
import { TextField } from '@mui/material'

// type SearchProps = {
// 	handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
// 	textInput: LegacyRef<HTMLInputElement> | undefined,
// 	handleUserLogout: (e: any) => void
// }

const Search = () => {
	const [textInput, setTextInput] = useState('')
	//const [searchTerm, setSearchTerm] = useState('')

	// const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
	// 	setTextInput(e.currentTarget.value)
	// }
	const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submitted' + textInput)
	}

	const handleClear = (e: React.MouseEvent<HTMLElement>) => {
		setTextInput('')
	}

	return (
		<Box sx={{ flexGrow: 1, minWidth: '100%' }}>
			<AppBar position="static" sx={{ backgroundColor: '#1f2328', boxShadow: 'none' }}>
				<Toolbar>
					<Box sx={{ flexGrow: 0.5 }}/>
					<div className='search-wrap'>
						<form className='search-bar' onSubmit={handleSubmit}>
							<input type='text' className='search-bar-input' value={textInput} onChange={handleChange} required placeholder='Search...' />
							{/* <TextField variant='standard' type='search' value={textInput} onChange={handleChange} required placeholder='Search...'
								sx={{
									background: 'transparent',
									textAlign: 'center',
									flex: 1,
									border: 0,
									outline: 'none',
									padding: '1rem 0.75rem',
									alignItems: 'center',
									fontSize: '20px',
									color: '#d6ecff',
									input: {
										color: '#d6ecff',
										textAlign: 'center',
										fontSize: '20px',
										flex: 1,
										// padding: '1rem 0.75rem',
										'&::placeholder': {
											color: '#d6ecff'
										},
									}
								}}
								InputProps={{
									disableUnderline: true
								}} /> */}
							{textInput !== '' ?
								<IconButton onClick={handleClear} size='medium'>
									<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
								</IconButton>
								: <></>
							}
							<IconButton type='submit' size='medium'>
								{textInput !== '' ?
									<Link href={textInput !== '' ? `/game/?search=${textInput}` : ''}>
										<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
									</Link>
									:
									<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
								}
							</IconButton>
						</form>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export { Search }