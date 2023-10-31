/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AppBar, Box, Toolbar, IconButton } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { useSearchContext } from '@/app/searchcontext'
import { SuggestionList } from './SuggestionList'
import './Search.css'


// type SearchProps = {
// 	handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
// 	textInput: LegacyRef<HTMLInputElement> | undefined,
// 	handleUserLogout: (e: any) => void
// }

const Search = () => {
	// const { gameSearch, setGameSearch } = useSearchContext()
	const [gameSearch, setGameSearch] = useState('')
	const router = useRouter()

	const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
		setGameSearch(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		localStorage.setItem('searchterm', gameSearch)
		router.push(`/game/${gameSearch}`)
	}

	const handleClear = (e: React.MouseEvent<HTMLElement>) => {
		setGameSearch('')
	}

	return (
		<Box sx={{ flexGrow: 1, minWidth: '100%' }}>
			<AppBar position="static" sx={{ backgroundColor: '#1f2328', boxShadow: 'none' }}>
				<Toolbar>
					<Box sx={{ flexGrow: 0.5 }}/>
					<div className='search-wrap'>
						<form className='search-bar' onSubmit={handleSubmit}>
							<input type='text' className='search-bar-input' value={gameSearch} onChange={handleChange} required placeholder='Search...' />
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
							{gameSearch !== '' ?
								<IconButton onClick={handleClear} size='medium'>
									<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
								</IconButton>
								: <></>
							}
							<IconButton type='submit' size='medium' onClick={() => localStorage.setItem('searchterm', gameSearch)}>
								{gameSearch !== '' ?
									// <Link href={gameSearch !== '' ? `/game/?search=${gameSearch}` : ''}>
									<Link href={gameSearch !== '' ? `/game/${gameSearch}`: ''}>
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
			<SuggestionList searchterm={gameSearch} />
		</Box>
	)
}

export { Search }