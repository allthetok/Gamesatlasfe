/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import './Profile.css'
import { Session } from 'next-auth'
import { TableRows } from '@mui/icons-material'
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, Box, Typography, TableCell, Button } from '@mui/material'
import { genresButtonArray, platformButtonArray } from '../../helpers/button'
import { BoxActiveSx, BoxNoBorderSx, ButtonActiveSx, ButtonSx } from '../../sxstyling/styles'

type ProfileProps = {
	// userData: Session | null
	userData: any
}

const Profile = ({ userData }: ProfileProps) => {
	const data = useSession()
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
								<Paper sx={{ width: '100%', mb: 2, color: '#ddd', backgroundColor: '#1b1e22' }}>
									<Typography sx={{ flex: '1 1 100%', borderBottom: '1px solid white', fontWeight: '700' }} variant='h6' id='tableTitle' component='div'>
										Account Info
									</Typography>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 350, color: '#ddd', backgroundColor: '#1b1e22' }} aria-label='Account Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														Username:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.name}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														Email:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.email}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														Previous Login:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{new Date(Number(userData.data.user.token.iat) * 1000).toLocaleString()}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														Account Created By:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.provider}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														GamesAtlas ID:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.id}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														{userData.data.user.provider} ID:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
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
									<Typography sx={{ flex: '1 1 100%', borderBottom: '1px solid white', fontWeight: '700' }} variant='h6' id='tableTitle' component='div'>
										Game Preferences
									</Typography>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 850, color: '#ddd', backgroundColor: '#1b1e22' }} aria-label='Account Details table'>
											<TableHead>
											</TableHead>
											<TableBody>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd', minWidth: '50px' }} component='th' scope='row' padding='none'>
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
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
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
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														Favorite Themes:
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{new Date(Number(userData.data.user.token.iat) * 1000).toLocaleString()}
													</TableCell>
												</TableRow>
												<TableRow sx={{ backgroundColor: '#1b1e22' }}>
													<TableCell sx={{ color: '#ddd' }} component='th' scope='row' padding='none'>
														Favorite Game Type
													</TableCell>
													<TableCell sx={{ color: '#ddd' }} component='td' align='right'>
														{userData.data.user.provider}
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