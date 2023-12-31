/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { IconButton } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoginIcon from '@mui/icons-material/Login'
import { SuggestionList } from './SuggestionList'
import { Font25Sx, NavIconSx, OpacitySx } from '../../sxstyling/styles'
import './Search.css'

const Search = () => {
	const [gameSearch, setGameSearch] = useState('')
	const router = useRouter()
	const currentPath = usePathname()


	const data = useSession()

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
		<div>
			<header className='nav-header'>
				<nav>
					<ul className='nav-menu'>
						<li className={currentPath === '/' ? 'nav-logo-active' : 'nav-logo'}>
							<Link href='/'>
								<Image src='/logo-highres-circle.png' width={90.41} height={65} alt='GamesAtlas Logo' />
							</Link>
						</li>
						<li className='nav-search'>
							<form className='search-bar' onSubmit={handleSubmit}>
								<input type='text' className='search-bar-input' value={gameSearch} onChange={handleChange} required placeholder='Search Games...' />
								{gameSearch !== '' ?
									<IconButton onClick={handleClear} size='medium'>
										<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={OpacitySx} />
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
								<li className={currentPath === '/explore' ? 'nav-link-active' : 'nav-link'}>
									<Link href='/explore' className={currentPath === '/explore' ? 'link-a-active' : 'link-a'}>
										<div className='link-text'>
											Explore
										</div>
									</Link>
								</li>
								<li className={currentPath === '/advsearch' ? 'nav-link-active' : 'nav-link'}>
									<Link href='/advsearch' className={currentPath === '/advsearch' ? 'link-a-active' : 'link-a'}>
										<div className='link-text'>
											Advanced Search
										</div>
									</Link>
								</li>
								<li className={currentPath === '/recommend' ? 'nav-link-active' : 'nav-link'}>
									<Link href='/recommend' className={currentPath === '/recommend' ? 'link-a-active' : 'link-a'}>
										<div className='link-text'>
											Recommendations
										</div>
									</Link>
								</li>
								<li className={currentPath === '/likes' ? 'nav-link-active' : 'nav-link'}>
									<Link href='/likes' className={currentPath === '/likes' ? 'link-a-active' : 'link-a'}>
										<div className='link-text'>
											My List
										</div>
									</Link>
								</li>
							</ul>
						</li>
						<li className='nav-userlinks'>
							<ul className='link-grp-user'>
								<li className='nav-profile'>
									<Link href='/profile' className='link-a-icon'>
										<div className={currentPath === '/profile' ? 'link-icon-text-active' : 'link-icon-text'}>
											<IconButton sx={NavIconSx}>
												<AccountBoxIcon sx={Font25Sx} />
											</IconButton>
											<p>Profile</p>
										</div>
									</Link>
								</li>
								<li className='nav-profile'>
									{data.status === 'authenticated' ?
										<div onClick={() => signOut()} className='link-a-icon'>
											<div className={currentPath === '/api/auth/' ? 'link-icon-text-active': 'link-icon-text'}>
												<IconButton sx={NavIconSx}>
													<LoginIcon sx={Font25Sx} />
												</IconButton>
												<p>Logout</p>
											</div>
										</div>
										:
										<div onClick={() => signIn()} className='link-a-icon'>
											<div className={currentPath === '/api/auth/' ? 'link-icon-text-active': 'link-icon-text'}>
												<IconButton sx={NavIconSx}>
													<LoginIcon sx={Font25Sx} />
												</IconButton>
												<p>Login</p>
											</div>
										</div>
									}
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</header>
			<SuggestionList onClick={handleClear} searchterm={gameSearch} />
		</div>

	)
}

export { Search }
