/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { Session } from 'next-auth'
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, Box, Typography, TableCell, Button, IconButton, TextField } from '@mui/material'
import { gameModesButtonArray, genresButtonArray, platformButtonArray, themesButtonArray } from '../../helpers/button'
import { AccountBoxSx, AccountTypographySx, AllCellDSx, AllCellHSx, BackgroundColourSx, BoxActiveSx, BoxNoBorderSx, ButtonActiveSx, ButtonSx, CancelButtonSx, EmailTextFieldSx, PaperProfileSx, PlatformCellDSx, PlatformCellHSx, PrefBoxSx, ProfileCellSx, SaveButtonSx, TableAccSx, TableCellColourSx, TablePrefSx, UserNameTextFieldSx } from '../../sxstyling/styles'
import EditIcon from '@mui/icons-material/Edit'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { createGamePrefPatchConfig, createUserDetailsConfig, createUserPatchConfig, createUserProfileConfig, regexValidEmail } from '../../helpers/fctns'
import './Profile.css'


type ProfileProps = {
	user: Session['user'] | undefined
}

const Profile = ({ user }: ProfileProps) => {
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
				setEmail(user!.email)
				setUsername(user!.username)
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
				return
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
			const userProfileConfig = createUserPatchConfig('patch', 'userDetails', userid, profileid, 'GamesAtlas', specField, email, username, '')
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
				})
		}
	}

	const updateUserGamePref = async (userid: string, profileid: string, platforms: string[], genres: string[], themes: string[], gameModes: string[]) => {
		const profileGamePrefConfig = createGamePrefPatchConfig('patch', 'profileDetails', userid, profileid, platforms, genres, themes, gameModes)
		await axios(profileGamePrefConfig)
			.then(() => {
				setEditGame(false)
			})
			.catch((err: any) => {
				return
			})
	}

	useEffect(() => {
		if (user !== undefined ) {
			setLoading(false)
			getUserNameProfile(user.id, user.profileid, user.provider)
			getUserPrefProfile(user.id, user.profileid)
		}
	}, [user, editGame, editAcct])

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
								<a><img className='intro-img' src={(user?.image !== undefined && user?.image !== null) ? user.image : '/icons8-user-64.png'} alt='User Avatar'/></a>
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
									<span>{user!.provider !== 'GamesAtlas' ? user?.name : username}</span>
								</div>
								<div className='id-container'>
									<span>GamesAtlas ID: {user!.id}</span>
									{user!.externalId ? (
										<span>{user!.provider} ID: {user?.externalId}</span>
									): <></>}
								</div>
							</div>
						</div>
					</div>
					<div className='account-details-wrapper'>
						<div className='account-table-wrapper'>
							<Box sx={AccountBoxSx}>
								<Paper sx={PaperProfileSx}>
									<div className='table-heading-flex'>
										<Typography sx={AccountTypographySx} variant='h6' id='tableTitle' component='div'>
										Account Info
										</Typography>
										{user!.provider === 'GamesAtlas' ?
											<>
												{!editAcct ? <IconButton color='inherit' size='large' onClick={() => setEditAcct(!editAcct)}>
													<EditIcon/>
												</IconButton>
													:
													<div className='btn-save-cancel-wrap'>
														<Button sx={SaveButtonSx} color='inherit' size='large' onClick={() => updateUserDetails(user!.id, user!.profileid, usernameInput, emailInput, username, email)}>
														Save Changes
														</Button>
														<Button sx={CancelButtonSx} color='inherit' size='large' onClick={() => {
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
										<Table sx={TableAccSx} aria-label='Account Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
														Username:
													</TableCell>
													<TableCell sx={TableCellColourSx} component='td' align='right'>
														{editAcct ? <TextField
															sx={UserNameTextFieldSx}
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
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
														Email:
													</TableCell>
													<TableCell sx={TableCellColourSx} component='td' align='right'>
														{editAcct ?
															<TextField
																sx={EmailTextFieldSx}
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
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
														Email Verified:
													</TableCell>
													<TableCell sx={TableCellColourSx} component='td' align='right'>
														<IconButton color='inherit' size='small'>
															{(!user!.emailVerified && user!.provider === 'GamesAtlas') ?
																<CheckBoxOutlineBlankIcon/> : <CheckBoxIcon/>}
															{/* <CheckBoxOutlineBlankIcon/> */}
														</IconButton>
													</TableCell>
												</TableRow>
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
														Previous Login:
													</TableCell>
													<TableCell sx={TableCellColourSx} component='td' align='right'>
														{new Date(Date.now()).toLocaleString()}
													</TableCell>
												</TableRow>
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
														Account Created By:
													</TableCell>
													<TableCell sx={TableCellColourSx} component='td' align='right'>
														{user!.provider}
													</TableCell>
												</TableRow>
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
														GamesAtlas ID:
													</TableCell>
													<TableCell sx={TableCellColourSx} component='td' align='right'>
														{user!.id}
													</TableCell>
												</TableRow>
												{user!.externalId !== null ?
													<TableRow sx={BackgroundColourSx}>
														<TableCell sx={ProfileCellSx} component='th' scope='row' padding='none'>
															{user!.provider} ID:
														</TableCell>
														<TableCell sx={ProfileCellSx} component='td' align='right'>
															{user!.externalId}
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
							<Box sx={PrefBoxSx}>
								<Paper sx={PaperProfileSx}>
									<div className='table-heading-flex'>
										<Typography sx={AccountTypographySx} variant='h6' id='tableTitle' component='div'>
										Game Preferences
										</Typography>
										{!editGame ? <IconButton color='inherit' size='large' onClick={() => setEditGame(!editGame)}>
											<EditIcon/>
										</IconButton>
											:
											<div className='btn-save-cancel-wrap'>
												<Button sx={SaveButtonSx} color='inherit' size='large' onClick={() => updateUserGamePref(user!.id, user!.profileid, platforms, genres, themes, gameModes)}>
												Save Changes
												</Button>
												<Button sx={CancelButtonSx} color='inherit' size='large' onClick={() => setEditGame(false)}>
												Cancel
												</Button>
											</div>}
									</div>
									<TableContainer component={Paper}>
										<Table sx={TablePrefSx} aria-label='Preference Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={PlatformCellHSx} component='th' scope='row' padding='none'>
														Your Platform:
													</TableCell>
													<TableCell sx={PlatformCellDSx} component='td' align='right'>
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
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={AllCellHSx} component='th' scope='row' padding='none'>
														Favorite Genres:
													</TableCell>
													<TableCell sx={AllCellDSx} component='td' align='right'>
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
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={AllCellHSx} component='th' scope='row' padding='none'>
														Favorite Themes:
													</TableCell>
													<TableCell sx={AllCellDSx} component='td' align='right'>
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
												<TableRow sx={BackgroundColourSx}>
													<TableCell sx={AllCellHSx} component='th' scope='row' padding='none'>
														Favorite Game Type
													</TableCell>
													<TableCell sx={AllCellDSx} component='td' align='right'>
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
				: <div className='load-wrapper'>
					<ReactLoading
						type={'spinningBubbles'}
						color={'#ddd'}
						height={200}
						width={200}
					/>
				</div>
			}
		</div>
	)
}

export { Profile }