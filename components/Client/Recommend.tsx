/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { SyntheticEvent, useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createUserPrefSearchConfig, createUserProfileConfig, createUserRecommendConfig } from '../../helpers/fctns'
import { PreferencesRecList, ProfilePrefSearchConfig, SimpleUserLikeConfig } from '../../helpers/fetypes'
import { useLikes } from '../../hooks/useLikes'
import ReactLoading from 'react-loading'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import { Autocomplete, Button, SvgIcon, TextField } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { ListTblToggleSx, IconSx, SmallAutoCompleteSx } from '../../sxstyling/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { Explore } from '../../helpers/fetypes'
import { theme } from '../../sxstyling/theme'
import { Session } from 'next-auth'
import './Recommend.css'
import './IndGameList.css'


type RecommendProps = {
	user: Session['user'] | undefined
}

const Recommend = ({ user }: RecommendProps) => {

	const [errorIGDB, setErrorIGDB] = useState('')
	const [loadingIGDB, setLoadingIGDB] = useState(true)
	const [userPrefList, setUserPrefList] = useState<PreferencesRecList[]>([])
	const [userSimilarRecList, setUserSimilarRecList] = useState<Explore[]>([])
	const [viewToggle, setViewToggle] = useState('list')
	const [limit, setLimit] = useState('10')

	const { likeDataFetch, error, loading } = useLikes(user?.id)

	const numOptions = ['7', '10', '25', '50']

	const onLimitChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setLimit(value!)
	}

	const getUserPrefProfile = async (userid: string, profileid: string) => {
		const profileSearchConfig = createUserProfileConfig('post', 'profileDetails', userid, profileid)

		await axios(profileSearchConfig)
			.then((response: any) => {
				const prefArrayData = {
					platform: response.data.platform,
					genres: response.data.genres,
					themes: response.data.themes,
					gamemodes: response.data.gamemodes
				}
				getRecommendationList(userid, prefArrayData)
			})
			.catch((err: any) => {
				return
			})
	}

	const getRecommendationList = async (userid: string, prefArrayData: any) => {
		const userLikeConfig: SimpleUserLikeConfig = createUserRecommendConfig('post', 'recommendLikes', userid)
		await axios(userLikeConfig)
			.then((response: AxiosResponse) => {
				const prefRecList = response.data.map((item: any) => item.recommendobjarr)
				const prefRecListJoined = Array.prototype.concat(...prefRecList).filter((item: any) => item !== null)
				setUserSimilarRecList(prefRecListJoined.slice(0, Number(limit) > prefRecListJoined.length ? prefRecListJoined.length : Number(limit)))
			})
			.catch((err: AxiosError) => {
				setErrorIGDB('Unable to retrieve recommendations based on your Profile Game Preferences')
				console.error(err)
			})
		if (prefArrayData.platform.length !== 0 || prefArrayData.genres.length !== 0 || prefArrayData.themes.length !== 0 || prefArrayData.gamemodes.length !== 0) {
			const userPrefSearchConfig: ProfilePrefSearchConfig = createUserPrefSearchConfig('post', 'recommendPrefs', prefArrayData.platform, prefArrayData.genres, prefArrayData.themes, prefArrayData.gamemodes, 'age_ratings, follows, involved_companies, game_modes, category, total_rating', Number(limit), 'IGDB Rating', 'desc')
			await axios(userPrefSearchConfig)
				.then((response) => {
					setUserPrefList(response.data)
					setLoadingIGDB(false)
				})
				.catch((err) => {
					setErrorIGDB('Unable to retrieve recommendations based on your Profile Game Preferences')
					console.error(err)
				})
		}
		else {
			setLoadingIGDB(false)
		}
	}

	useEffect(() => {
		if (user !== undefined ) {
			getUserPrefProfile(user!.id, user!.profileid)

		}
	}, [user, limit])

	return (
		<div>
			<div className='filter-recommend-wrap'>
				<div className='drop-wrap'>
					<ThemeProvider theme={theme}>
						<Autocomplete
							className='auto-comp'
							disablePortal
							id='combo-box'
							options={numOptions}
							value={limit}
							onChange={onLimitChange}
							sx={SmallAutoCompleteSx} renderInput={(params) => <TextField {...params} label="Limit" />} />
					</ThemeProvider>
				</div>
				<div className='button-wrap'>
					<Button sx={ListTblToggleSx(viewToggle, 'listbtn')} onClick={() => setViewToggle('list')} variant={viewToggle === 'list' ? 'contained' : 'outlined'}>
						<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
							<GridViewIcon />
						</SvgIcon>
					</Button>
					<Button sx={ListTblToggleSx(viewToggle, 'tblbtn')} onClick={() => setViewToggle('table')} variant={viewToggle === 'table' ? 'contained' : 'outlined'}>
						<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
							<TableRowsIcon />
						</SvgIcon>
					</Button>
				</div>
			</div>
			<div className='explore-wrap'>
				<h3 className='title-recommend'>
						Based on Games You Like
				</h3>
				{!loadingIGDB && !loading ?
					<>
						{userSimilarRecList.length !== 0 ?
							<>
								{viewToggle === 'list' ?
									<div className='grid-wrapper'>
										{userSimilarRecList.map((item: any) => (
											<IndGame key={item.index} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} liked={likeDataFetch.length !== 0 ? likeDataFetch.map((item: any) => item.gameobj).filter((game: any) => game.id === item.id).length !== 0 : false} />
										))}
									</div>
									: <IndGameTable multiResp={userSimilarRecList} />}
							</>
							: <h3 className='title-recommend'>
								For Recommendations Fill Your List
							</h3>
						}
					</>
					:
					<div className='load-wrapper'>
						<ReactLoading
							type={'spinningBubbles'}
							color={'#ddd'}
							height={200}
							width={200}
						/>
					</div>}
			</div>
			{!loadingIGDB && !loading ?
				<>
					{userPrefList.length !== 0 ?
						<>
							{userPrefList.map((item: any) => (
								<div className='explore-wrap'>
									<div>
										<h3 className='title-recommend'>
										Based on Your Profile&apos;s {item.name.replace('User ', '')}
										</h3>
										{viewToggle === 'list' ?
											<div className='grid-wrapper'>
												{item.result.map((item: any) => (
													<IndGame key={item.index} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} liked={likeDataFetch.length !== 0 ? likeDataFetch.map((item: any) => item.gameobj).filter((game: any) => game.id === item.id).length !== 0 : false} />
												))}
											</div>
											: <IndGameTable multiResp={item.result} />}
									</div>
								</div>
							))}
						</>
						: <h3 className='title-recommend'>
							Unable to retrieve recommendations based on your Profile Game Preferences
						</h3>
					}
				</>
				:
				<div className='load-wrapper'>
					<ReactLoading
						type={'spinningBubbles'}
						color={'#ddd'}
						height={200}
						width={200}
					/>
				</div>}
		</div>
	)
}

export { Recommend }