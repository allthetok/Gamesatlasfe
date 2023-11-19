/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Session } from 'next-auth'
import { TableRows } from '@mui/icons-material'
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, Box, Typography, TableCell, Button, IconButton } from '@mui/material'
import { gameModesButtonArray, genresButtonArray, platformButtonArray, themesButtonArray } from '../../helpers/button'
import { BoxActiveSx, BoxNoBorderSx, ButtonActiveSx, ButtonSx } from '../../sxstyling/styles'
import EditIcon from '@mui/icons-material/Edit'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
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

	console.log(data)

	useEffect(() => {
		if (data.status === 'authenticated') {
			setLoading(false)
		}
	}, [data])

	return (
		<div>
			{!loading ?
				<div className='profile-wrapper'>
					<div className='header-profile-wrapper'>
						<div className='bg-wrapper'>
							<div className='bg-intro'></div>
						</div>
						<div className='intro-container'>
							{/* <div className='intro-wrapper'> */}
							<div className='intro-avatar'>
								<a><img className='intro-img' src={(userData?.data.user?.image !== undefined && userData?.data.user?.image !== null) ? userData.data.user.image : '/icons8-user-64.png'} alt='User Avatar'/></a>
							</div>
							<div className='intro-name'>
								<div className='name-container'>
									<span>{userData.data.user.name}</span>
								</div>
								<div className='id-container'>
									<span>GamesAtlas ID: {userData.data.user.id}</span>
									{userData.data.user.externalId ? (
										<span>{userData.data.user.provider} ID: {userData.data.user.externalId}</span>
									): <></>}
								</div>
							</div>
							{/* </div> */}
						</div>
					</div>
					<div className='account-details-wrapper'>
						<div className='account-table-wrapper'>
							<Box sx={{ width: '500px' }}>
								<Paper sx={{ width: '100%', mb: 2, color: '#ddd', backgroundColor: '#1b1e22'}}>
									<div className='table-heading-flex'>
										<Typography sx={{ flex: '1 1 100%',  fontWeight: '700' }} variant='h6' id='tableTitle' component='div'>
										Account Info
										</Typography>
										{!editAcct ? <IconButton color='inherit' size='large' onClick={() => setEditAcct(!editAcct)}>
											<EditIcon/>
										</IconButton>
											: <Button sx={{ bgcolor: '#122e51', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#3e83d5', border: 'none', fontWeight: '700' } }} color='inherit' size='large' onClick={() => setEditAcct(!editAcct)}>
												Save
											</Button>}
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
														{userData.data.user.name}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Email:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.email}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Email Verified:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														<IconButton color='inherit' size='small'>
															{/* {userData.user.emailVerified ?
															<CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>} */}
															<CheckBoxOutlineBlankIcon/>
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
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														{userData.data.user.provider} ID:
													</TableCell>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='td' align='right'>
														{userData.data.user.externalId}
													</TableCell>
												</TableRow>
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
											: <Button sx={{ bgcolor: '#122e51', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#3e83d5', border: 'none', fontWeight: '700' } }} color='inherit' size='large' onClick={() => setEditGame(!editGame)}>
												Save
											</Button>}
									</div>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 850, color: '#ddd', backgroundColor: '#1b1e22' }} aria-label='Account Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', minWidth: '50px', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Your Platform:
													</TableCell>
													<TableCell sx={{ color: '#ddd', 'padding': '0' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{platformButtonArray.map((platform: string) => (
																<li className='adv-nav-tabs-li' key={platform}>
																	<Box>
																		<Button sx={ButtonSx}>
																			{platform}
																		</Button>
																	</Box>
																</li>
															))}
														</ul>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Favorite Genres:
													</TableCell>
													<TableCell sx={{ color: '#ddd', width: '900' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{genresButtonArray.map((genre: string) => (
																<li className='adv-nav-tabs-li' key={genre}>
																	<Box>
																		<Button sx={ButtonSx}>
																			{genre}
																		</Button>
																	</Box>
																</li>
															))}
														</ul>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Favorite Themes:
													</TableCell>
													<TableCell sx={{ color: '#ddd', width: '900' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{themesButtonArray.map((theme: string) => (
																<li className='adv-nav-tabs-li' key={theme}>
																	<Box>
																		<Button sx={ButtonSx}>
																			{theme}
																		</Button>
																	</Box>
																</li>
															))}
														</ul>
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', fontWeight: '600' }} component='th' scope='row' padding='none'>
														Favorite Game Type
													</TableCell>
													<TableCell sx={{ color: '#ddd', width: '900' }} component='td' align='right'>
														<ul className='adv-nav-tabs-table'>
															{gameModesButtonArray.map((mode: string) => (
																<li className='adv-nav-tabs-li' key={mode}>
																	<Box>
																		<Button sx={ButtonSx}>
																			{mode}
																		</Button>
																	</Box>
																</li>
															))}
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
				: <></>
			}
		</div>
	)
}

export { Profile }