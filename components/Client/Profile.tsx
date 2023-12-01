/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import Image from 'next/image'
import { Session } from 'next-auth'
import { TableRows } from '@mui/icons-material'
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, Box, Typography, TableCell, Button, IconButton, TextField } from '@mui/material'
import { gameModesButtonArray, genresButtonArray, platformButtonArray, themesButtonArray } from '../../helpers/button'
import { BoxActiveSx, BoxNoBorderSx, ButtonActiveSx, ButtonSx } from '../../sxstyling/styles'
import EditIcon from '@mui/icons-material/Edit'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { createUserDetailsConfig, createUserProfileConfig, regexValidEmail } from '../../helpers/fctns'
import './Profile.css'


type ProfileProps = {
	// userData: Session | null
	userData: any
}

const Profile = ({ userData }: ProfileProps) => {
	const data = useSession()
	const [editAcct, setEditAcct] = useState(false)
	const [editGame, setEditGame] = useState(false)
	const [loading, setLoading] = useState(true)

	const [platforms, setPlatforms] = useState<string[]>([])
	const [genres, setGenres] = useState<string[]>([])
	const [themes, setThemes] = useState<string[]>([])
	const [gameModes, setGameModes] = useState<string[]>([])

	const [email, setEmail] = useState<string>('')
	const [username, setUsername] = useState<string>('')

	const [usernameInput, setUsernameInput] = useState<string>('')
	const [emailInput, setEmailInput] = useState<string>('')

	const [errorAcct, setErrorAcct] = useState('')

	const getUserNameProfile = async (userid: string, profileid: string, provider: string) => {
		const nameSearchConfig = createUserDetailsConfig('post', 'userDetails', userid, profileid, provider)

		await axios(nameSearchConfig)
			.then((response: any) => {
				setEmail(response.data.email)
				setUsername(response.data.username)
			})
			.catch((err: any) => {
				console.log(err)
				setEmail(userData.data.user.email)
				setUsername(userData.data.user.username)
			})
	}

	const getUserPrefProfile = async (userid: string, profileid: string) => {
		const profileSearchConfig = createUserProfileConfig('post', 'profileDetails', userid, profileid)

		await axios(profileSearchConfig)
			.then((response: any) => {
				const prefData = response.data
				setPlatforms(prefData.platform)
				setGenres(prefData.genres)
				setThemes(prefData.themes)
				setGameModes(prefData.gamemodes)
			})
			.catch((err: any) => {
				console.log(err)
			})
	}

	const updateUserDetails = async (userid: string, profileid: string, username: string, email: string, currentUsername: string, currentEmail: string) => {
		let specField = ''

		if (username === currentUsername && email === currentEmail) {
			setErrorAcct('Cancel editing or edit atleast one of username/email')
			return
		}
		else if (username === '' && email === '') {
			setErrorAcct('Cancel editing or edit atleast one of username/email')
			return
		}
		else if (username === currentUsername && email === '') {
			setErrorAcct('Cancel editing or edit atleast one of username/email')
			return
		}
		else if (email === currentEmail && username === '') {
			setErrorAcct('Cancel editing or edit atleast one of username/email')
			return
		}
		else if (username !== currentUsername && (email === currentEmail || email === '') && username !== '') {
			specField = 'username'
		}
		else if ((username === currentUsername || username === '') && email !== currentEmail && email !== '' && regexValidEmail(email)) {
			specField = 'email'
		}
		else if (username !== currentUsername && email !== currentEmail && username !== '' && email !== '' && regexValidEmail(email)) {
			specField = 'both'
		}
		else {
			setErrorAcct('Unable to edit user attributes')
			return
		}

		if (specField !== '') {
			const userProfileConfig = {
				method: 'patch',
				url: 'http://localhost:5000/api/userDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					'userid': Number(userid),
					'profileid': Number(profileid),
					'username': username,
					'email': email,
					'specField': specField,
					'provider': 'GamesAtlas'
				}
			}

			await axios(userProfileConfig)
				.then((response: any) => {
					if (response.status === 200) {
						setEditAcct(false)
						setEmailInput('')
						setUsernameInput('')
						setErrorAcct('')
					}
				})
				.catch((err: any) => {
					setErrorAcct(err.response.data.error)
					console.log(err)
				})
		}
	}

	const updateUserGamePref = async (userid: string, profileid: string, platforms: string[], genres: string[], themes: string[], gameModes: string[]) => {
		const profilePrefConfig = {
			method: 'patch',
			url: 'http://localhost:5000/api/profileDetails',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'userid': Number(userid),
				'profileid': Number(profileid),
				'platforms': platforms,
				'genres': genres,
				'themes': themes,
				'gameModes': gameModes
			}
		}
		await axios(profilePrefConfig)
			.then((response: any) => {
				setEditGame(false)
			})
			.catch((err: any) => {
				console.log(err)
			})
	}

	useEffect(() => {
		if (data.status === 'authenticated') {
			setLoading(false)
			getUserNameProfile(userData.data.user.id, userData.data.user.profileid, userData.data.user.provider)
			getUserPrefProfile(userData.data.user.id, userData.data.user.profileid)
		}
	}, [data, editGame, editAcct])

	return (
		<div>
			{!loading ?
				<div className='profile-wrapper'>
					<div className='header-profile-wrapper'>
						<div className='bg-wrapper'>
							<div className='bg-intro'></div>
						</div>
						<div className='intro-container'>
							<div className='intro-avatar'>
								<a><img className='intro-img' src={(userData?.data.user?.image !== undefined && userData?.data.user?.image !== null) ? userData.data.user.image : '/icons8-user-64.png'} alt='User Avatar'/></a>
								{errorAcct !== '' ? (
									<div className='error-credentials'>
										<span>Error: {errorAcct}</span>
									</div>
								)
									: <></>
								}
							</div>
							<div className='intro-name'>
								<div className='name-container'>
									<span>{userData.data.user.provider !== 'GamesAtlas' ? userData.data.user.name : username}</span>
								</div>
								<div className='id-container'>
									<span>GamesAtlas ID: {userData.data.user.id}</span>
									{userData.data.user.externalId ? (
										<span>{userData.data.user.provider} ID: {userData.data.user.externalId}</span>
									): <></>}
								</div>
							</div>
						</div>
					</div>
					<div className='account-details-wrapper'>
						<div className='account-table-wrapper'>
							<Box sx={{ width: '500px' }}>
								<Paper sx={{ width: '100%', mb: 2, color: '#ddd', backgroundColor: '#1b1e22' }}>
									<div className='table-heading-flex'>
										<Typography sx={{ flex: '1 1 100%',  fontWeight: '700' }} variant='h6' id='tableTitle' component='div'>
										Account Info
										</Typography>
										{userData.data.user.provider === 'GamesAtlas' ?
											<>
												{!editAcct ? <IconButton color='inherit' size='large' onClick={() => setEditAcct(!editAcct)}>
													<EditIcon/>
												</IconButton>
													:
													<div className='btn-save-cancel-wrap'>
														<Button sx={{ bgcolor: '#122e51', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#3e83d5', border: 'none', fontWeight: '700' } }} color='inherit' size='large' onClick={() => updateUserDetails(userData.data.user.id, userData.data.user.profileid, usernameInput, emailInput, username, email)}>
														Save Changes
														</Button>
														<Button sx={{ bgcolor: '#122e51', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '100px', height: '56px', '&:hover': { bgcolor: '#3e83d5', border: 'none', fontWeight: '700' } }} color='inherit' size='large' onClick={() => {
															setEditAcct(false)
															setUsernameInput('')
															setEmailInput('')
															setErrorAcct('')}}>
														Cancel
														</Button>
													</div>}
											</>
											: <></>}

									</div>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 350, color: '#ddd', backgroundColor: '#1b1e22' }} aria-label='Account Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Username:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{editAcct ? <TextField
															sx={{ backgroundColor: 'white', borderRadius: '4px', fontSize: '1rem', border: 'none' }}
															id='outlined-user-input'
															label='Username'
															value={usernameInput}
															onChange={(e) => setUsernameInput(e.currentTarget.value)}
															variant='standard'
														/>
															:
															<p>{username}</p>}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Email:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{editAcct ?
															<TextField
																sx={{ backgroundColor: 'white', borderRadius: '4px', fontSize: '1rem' }}
																id='outlined-email-input'
																label='Email'
																value={emailInput}
																onChange={(e) => setEmailInput(e.currentTarget.value)}
																variant='standard'
															/>
															:
															<p>{email}</p>}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Email Verified:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														<IconButton color='inherit' size='small'>
															{(!userData.data.user.emailVerified && userData.data.user.provider === 'GamesAtlas') ?
																<CheckBoxOutlineBlankIcon/> : <CheckBoxIcon/>}
															{/* <CheckBoxOutlineBlankIcon/> */}
														</IconButton>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Previous Login:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{new Date(Number(userData.data.user.token.iat) * 1000).toLocaleString()}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Account Created By:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.provider}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														GamesAtlas ID:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.id}
													</TableCell>
												</TableRow>
												{userData.data.user.externalId !== null ?
													<TableRow sx={{ backgroundColor: '#1b1e22' }}>
														<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
															{userData.data.user.provider} ID:
														</TableCell>
														<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='td' align='right'>
															{userData.data.user.externalId}
														</TableCell>
													</TableRow>
													: <></>
												}
											</TableBody>
										</Table>
									</TableContainer>
								</Paper>
							</Box>
						</div>
						<div className='game-preferences-table-wrapper'>
							<Box sx={{ width: '950px' }}>
								<Paper sx={{ width: '100%', mb: 2, color: '#ddd', backgroundColor: '#1b1e22' }}>
									<div className='table-heading-flex'>
										<Typography sx={{ flex: '1 1 100%', fontWeight: '700' }} variant='h6' id='tableTitle' component='div'>
										Game Preferences
										</Typography>
										{!editGame ? <IconButton color='inherit' size='large' onClick={() => setEditGame(!editGame)}>
											<EditIcon/>
										</IconButton>
											:
											<div className='btn-save-cancel-wrap'>
												<Button sx={{ bgcolor: '#122e51', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#3e83d5', border: 'none', fontWeight: '700' } }} color='inherit' size='large' onClick={() => updateUserGamePref(userData.data.user.id, userData.data.user.profileid, platforms, genres, themes, gameModes)}>
												Save Changes
												</Button>
												<Button sx={{ bgcolor: '#122e51', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '100px', height: '56px', '&:hover': { bgcolor: '#3e83d5', border: 'none', fontWeight: '700' } }} color='inherit' size='large' onClick={() => setEditGame(false)}>
												Cancel
												</Button>
											</div>}
									</div>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 850, color: '#ddd', backgroundColor: '#1b1e22' }} aria-label='Account Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', minWidth: '50px', fontWeight: '600', fontSize: '1rem' }} component='th' scope='row' padding='none'>
														Your Platform:
													</TableCell>
													<TableCell sx={{ color: '#ddd', 'padding': '0' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{platformButtonArray.map((platform: string) => {
																const platformIncludes = platforms.includes(platform)
																return (
																	<li className={platformIncludes ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={platform}>
																		<Box sx={platformIncludes ? BoxActiveSx : BoxNoBorderSx}>
																			<div className={editGame === false && platformIncludes === true ? 'active-btn-disabled' : ''}>
																				<Button sx={platformIncludes ? ButtonActiveSx : ButtonSx} disabled={!editGame} onClick={() => {
																					let currentPlatforms = [...platforms]
																					if (platformIncludes) {
																						currentPlatforms = currentPlatforms.filter((indPlatform: string) => indPlatform !== platform)
																					}
																					else {
																						currentPlatforms.push(platform)
																					}
																					setPlatforms(currentPlatforms)
																				}}>
																					{platform}
																				</Button>
																			</div>
																		</Box>
																	</li>
																)})}
														</ul>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600', fontSize: '1rem' }} component='th' scope='row' padding='none'>
														Favorite Genres:
													</TableCell>
													<TableCell sx={{ color: '#ddd', width: '900' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{genresButtonArray.map((genre: string) => {
																const genreIncludes = genres.includes(genre)
																return (
																	<li className={genreIncludes ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={genre}>
																		<Box sx={genreIncludes ? BoxActiveSx : BoxNoBorderSx}>
																			<div className={editGame === false && genreIncludes === true ? 'active-btn-disabled' : ''}>
																				<Button sx={genreIncludes ? ButtonActiveSx : ButtonSx} disabled={!editGame} onClick={() => {
																					let currentGenres = [...genres]
																					if (genreIncludes) {
																						currentGenres = currentGenres.filter((indGenre: string) => indGenre !== genre)
																					}
																					else {
																						currentGenres.push(genre)
																					}
																					setGenres(currentGenres)
																				}}>
																					{genre}
																				</Button>
																			</div>
																		</Box>
																	</li>
																)})}
														</ul>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600', fontSize: '1rem' }} component='th' scope='row' padding='none'>
														Favorite Themes:
													</TableCell>
													<TableCell sx={{ color: '#ddd', width: '900' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{themesButtonArray.map((theme: string) => {
																const themeIncludes = themes.includes(theme)
																return (
																	<li className={themeIncludes ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={theme}>
																		<Box sx={themeIncludes ? BoxActiveSx : BoxNoBorderSx}>
																			<div className={editGame === false && themeIncludes === true ? 'active-btn-disabled' : ''}>
																				<Button sx={themeIncludes ? ButtonActiveSx : ButtonSx} disabled={!editGame} onClick={() => {
																					let currentThemes = [...themes]
																					if (themeIncludes) {
																						currentThemes = currentThemes.filter((indTheme: string) => indTheme !== theme)
																					}
																					else {
																						currentThemes.push(theme)
																					}
																					setThemes(currentThemes)
																				}}>
																					{theme}
																				</Button>
																			</div>
																		</Box>
																	</li>
																)})}
														</ul>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600', fontSize: '1rem' }} component='th' scope='row' padding='none'>
														Favorite Game Type
													</TableCell>
													<TableCell sx={{ color: '#ddd', width: '900' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{gameModesButtonArray.map((mode: string) => {
																const gameModeIncludes = gameModes.includes(mode)
																return (
																	<li className={gameModeIncludes ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={mode}>
																		<Box sx={gameModeIncludes ? BoxActiveSx : BoxNoBorderSx}>
																			<div className={editGame === false && gameModeIncludes === true ? 'active-btn-disabled' : ''}>
																				<Button sx={gameModeIncludes ? ButtonActiveSx : ButtonSx} disabled={!editGame} onClick={() => {
																					let currentGameModes = [...gameModes]
																					if (gameModeIncludes) {
																						currentGameModes = currentGameModes.filter((gameMode: string) => gameMode !== mode)
																					}
																					else {
																						currentGameModes.push(mode)
																					}
																					setGameModes(currentGameModes)
																				}}>
																					{mode}
																				</Button>
																			</div>
																		</Box>
																	</li>
																)})}
														</ul>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableContainer>
								</Paper>
							</Box>
						</div>
					</div>
				</div>
				: <ReactLoading
					type={'spinningBubbles'}
					color={'#ddd'}
					height={150}
					width={150}
				/>
			}
		</div>
	)
}

export { Profile }