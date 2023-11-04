/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AppBar, Box, Toolbar, IconButton, autocompleteClasses, SvgIcon } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useSearchContext } from '@/app/searchcontext'
import { SuggestionList } from './SuggestionList'
import './Search.css'
import { Navbar } from './Navbar'
// import './Navbar.css'


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
	// <>
	// 	<AppBar position='static' sx={{ backgroundColor: '#1f2328' }}>
	// 		<Toolbar sx={{ justifyContent: 'center' }}>
	// 			<Box sx={{ marginRight: 'auto' }}>
	// 				<img className='logo-img' src='/logo-highres-circle.png' alt='Logo' />
	// 			</Box>
	// 			<div className='search-wrap'>
	// 				<form className='search-bar' onSubmit={handleSubmit}>
	// 					<input type='text' className='search-bar-input' value={gameSearch} onChange={handleChange} required placeholder='Search...' />
	// 					{gameSearch !== '' ?
	// 						<IconButton onClick={handleClear} size='medium'>
	// 							<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
	// 						</IconButton>
	// 						: <></>
	// 					}
	// 					<IconButton type='submit' size='medium' onClick={handleClear}>
	// 						{gameSearch !== '' ?
	// 							// <Link href={gameSearch !== '' ? `/game/?search=${gameSearch}` : ''}>
	// 							<Link href={`/game/${gameSearch}`}>
	// 								<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 							</Link>
	// 							:
	// 							<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 						}
	// 					</IconButton>
	// 				</form>
	// 			</div>
	// 			<Box sx={{ flexGrow: 0.5 }}/>
	// 			<div>
	// 					User Profile
	// 			</div>
	// 		</Toolbar>
	// 	</AppBar>
	// 	<SuggestionList onClick={handleClear} searchterm={gameSearch} />
	// </>


	// <Box sx={{ flexGrow: 1 }}>
	// 	{/* <AppBar position='static' sx={{ backgroundColor: '#1f2328', boxShadow: 'none', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', display: 'flex' }}> */}
	// 	<AppBar position='relative' sx={{ backgroundColor: '#1f2328', boxShadow: 'none', justifyContent: 'flex-start', width: 'auto', height: '65px', paddingTop: '0.625rem', flexDirection: 'row', display: 'flex'  }} >
	// 		{/* <Toolbar> */}
	// 		<img className='logo-img' src='/logo-highres-circle.png' alt='Logo' />
	// 		<div className='explore'>
	// 			Explore
	// 		</div>
	// 		<div className='search-wrap'>
	// 			<form className='search-bar' onSubmit={handleSubmit}>
	// 				<input type='text' className='search-bar-input' value={gameSearch} onChange={handleChange} required placeholder='Search...' />
	// 				{gameSearch !== '' ?
	// 					<IconButton onClick={handleClear} size='medium'>
	// 						<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
	// 					</IconButton>
	// 					: <></>
	// 				}
	// 				<IconButton type='submit' size='medium' onClick={handleClear}>
	// 					{gameSearch !== '' ?
	// 						// <Link href={gameSearch !== '' ? `/game/?search=${gameSearch}` : ''}>
	// 						<Link href={`/game/${gameSearch}`}>
	// 							<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 						</Link>
	// 						:
	// 						<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 					}
	// 				</IconButton>
	// 			</form>
	// 		</div>
	// 		<div>
	// 			<IconButton sx={{ color: '#ddd', paddingRight: '0.5rem', paddingTop: '0px', paddingLeft: '0px', paddingBottom: '0px' }} >
	// 				<AccountBoxIcon sx={{ fontSize: '55px' }} />
	// 			</IconButton>
	// 		</div>
	// 		{/* </Toolbar> */}
	// 	</AppBar>
	// </Box>
	<header>
		<nav>
			<ul className='nav-menu'>
				<li className='nav-logo'>
					<a href='/'>
						<img className='nav-img' src='logo-highres-circle.png' alt='GamesAtlas Logo' />
					</a>
				</li>
				<li className='nav-search'>
					<form className='search-bar' onSubmit={handleSubmit}>
						<input type='text' className='search-bar-input' value={gameSearch} onChange={handleChange} required placeholder='Search...' />
						{gameSearch !== '' ?
							<IconButton onClick={handleClear} size='medium'>
								<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
							</IconButton>
							: <></>
						}
						<IconButton type='submit' size='medium' onClick={handleClear}>
							{gameSearch !== '' ?
								<Link href={`/game/${gameSearch}`}>
									<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
								</Link>
								:
								<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
							}
						</IconButton>
					</form>
				</li>
				<li className='nav-links'>
					<ul className='link-grp'>
						<li className='nav-link'>
							<div className='link-text'>
								<a href='/'>
									Explore
								</a>
							</div>
						</li>
						<li className='nav-link'>
							<div className='link-text'>
								<a href='/'>
									Advanced Search
								</a>
							</div>
						</li>
						<li className='nav-link'>
							<div className='link-text'>
								<a href='/'>
									Recommendations
								</a>
							</div>
						</li>
						<li className='nav-link'>
							<div className='link-text'>
								<a href='/'>
									<b>Favorites</b>
								</a>
							</div>
						</li>
						<li className='nav-link'>
							<div className='link-text'>
								<a href='/'>
									<IconButton sx={{ color: '#ddd', paddingRight: '0.5rem', paddingTop: '0px', paddingLeft: '0px', paddingBottom: '0px' }} >
										<AccountBoxIcon sx={{ fontSize: '55px' }} />
									</IconButton>
									Profile
								</a>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</header>

	)

	// <Box sx={{ flexGrow: 1, minWidth: '100%' }}>
	// 		<AppBar position="static" sx={{ backgroundColor: '#1f2328', boxShadow: 'none' }}>
	// 			<Toolbar>
	// 				<Box sx={{ flexGrow: 0.5 }}/>
	// 				<div className='search-wrap'>
	// 					<form className='search-bar' onSubmit={handleSubmit}>
	// 						<input type='text' className='search-bar-input' value={gameSearch} onChange={handleChange} required placeholder='Search...' />
	// 						{/* <TextField variant='standard' type='search' value={textInput} onChange={handleChange} required placeholder='Search...'
	// 							sx={{
	// 								background: 'transparent',
	// 								textAlign: 'center',
	// 								flex: 1,
	// 								border: 0,
	// 								outline: 'none',
	// 								padding: '1rem 0.75rem',
	// 								alignItems: 'center',
	// 								fontSize: '20px',
	// 								color: '#d6ecff',
	// 								input: {
	// 									color: '#d6ecff',
	// 									textAlign: 'center',
	// 									fontSize: '20px',
	// 									flex: 1,
	// 									// padding: '1rem 0.75rem',
	// 									'&::placeholder': {
	// 										color: '#d6ecff'
	// 									},
	// 								}
	// 							}}
	// 							InputProps={{
	// 								disableUnderline: true
	// 							}} /> */}
	// 						{gameSearch !== '' ?
	// 							<IconButton onClick={handleClear} size='medium'>
	// 								<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
	// 							</IconButton>
	// 							: <></>
	// 						}
	// 						<IconButton type='submit' size='medium' onClick={handleClear}>
	// 							{gameSearch !== '' ?
	// 								// <Link href={gameSearch !== '' ? `/game/?search=${gameSearch}` : ''}>
	// 								<Link href={`/game/${gameSearch}`}>
	// 									<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 								</Link>
	// 								:
	// 								<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
	// 							}
	// 						</IconButton>
	// 					</form>
	// 				</div>
	// 			</Toolbar>
	// 		</AppBar>
	// 		<SuggestionList onClick={handleClear} searchterm={gameSearch} />
	// 	</Box>



	//Example:
	// <Box sx={{ flexGrow: 1 }}>
	// 			<AppBar position="static">
	// 				<Toolbar>
	// 					<IconButton
	// 						size="large"
	// 						edge="start"
	// 						color="inherit"
	// 						aria-label="open drawer"
	// 						sx={{ mr: 2 }}
	// 						onClick={handleHomeClick}
	// 					>
	// 						<HomeIcon />
	// 						{/* <MenuIcon /> */}
	// 					</IconButton>
	// 					<Typography
	// 						variant="h6"
	// 						noWrap
	// 						component="div"
	// 						sx={{ display: { xs: 'none', sm: 'block' } }}
	// 					>
	// 						<a className='homeText' onClick={handleHomeClick}>PodFinder</a>
	// 					</Typography>
	// 					<div className='searchWrap'>
	// 						<form className='searchBar' onSubmit={handleSubmit}>
	// 							<input type='text' ref={textInput} required placeholder='Search...' />
	// 							<button className='searchBtn'>
	// 								<span>Search</span>
	// 							</button>
	// 						</form>
	// 					</div>
	// 					<Box sx={{ flexGrow: 1 }} />
	// 					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
	// 						<IconButton
	// 							size="large"
	// 							edge="end"
	// 							aria-label="account of current user"
	// 							color="inherit"
	// 							onClick={handleDiscoverClick}
	// 						>
	// 							<SignalCellularAltIcon />
	// 						</IconButton>
	// 					</Box>
	// 					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
	// 						<IconButton
	// 							size="large"
	// 							edge="end"
	// 							aria-label="account of current user"
	// 							color="inherit"
	// 							onClick={handleLikeClick}
	// 						>
	// 							<FavoriteIcon />
	// 						</IconButton>
	// 					</Box>
	// 					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
	// 						<IconButton
	// 							size="large"
	// 							edge="end"
	// 							aria-label="account of current user"
	// 							color="inherit"
	// 							onClick={handleProfileClick}
	// 						>
	// 							<PersonIcon />
	// 						</IconButton>
	// 					</Box>
	// 					<LogoutDialog handleUserLogout={handleUserLogout}/>
	// 				</Toolbar>
	// 			</AppBar>
	// 		</Box>
}



export { Search }

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
