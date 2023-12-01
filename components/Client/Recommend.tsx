/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createUserPrefSearchConfig, createUserProfileConfig, createUserRecommendConfig } from '../../helpers/fctns'
import { MultiObj, PreferencesRecList, ProfilePrefSearchConfig, SimpleUserLikeConfig } from '../../helpers/fetypes'
import { useSession } from 'next-auth/react'
import ReactLoading from 'react-loading'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import { Autocomplete, Button, SvgIcon, TextField } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { ListTblToggleSx, IconSx } from '../../sxstyling/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import './Recommend.css'
import './IndGameList.css'
import { Explore } from '../../helpers/fetypes'
import { theme } from '../../sxstyling/theme'


type RecommendProps = {
	userData: any
}

const Recommend = ({ userData }: RecommendProps) => {
	const [loading, setLoading] = useState(true)
	const [userPrefList, setUserPrefList] = useState<PreferencesRecList[]>([])
	const [userSimilarRecList, setUserSimilarRecList] = useState<Explore[]>([])
	const [error, setError] = useState('')
	const [viewToggle, setViewToggle] = useState('list')
	const [limit, setLimit] = useState('10')

	const data = useSession()

	const numOptions = ['5', '10', '25', '50']

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
				console.log(err)
			})
	}

	const getRecommendationList = async (userid: string, prefArrayData: any) => {
		const userLikeConfig: SimpleUserLikeConfig = createUserRecommendConfig('post', 'recommendLikes', userid)
		await axios(userLikeConfig)
			.then((response: AxiosResponse) => {
				const prefRecList = response.data.map((item: any) => item.recommendobjarr)
				const prefRecListJoined = Array.prototype.concat(...prefRecList)
				setUserSimilarRecList(prefRecListJoined)
			})
			.catch((err: AxiosError) => {
				setError('Unable to retrieve recommendations based on your Profile Game Preferences')
				console.error(err)
			})
		if (prefArrayData.platform.length !== 0 || prefArrayData.genres.length !== 0 || prefArrayData.themes.length !== 0 || prefArrayData.gamemodes.length !== 0) {
			const userPrefSearchConfig: ProfilePrefSearchConfig = createUserPrefSearchConfig('post', 'recommendPrefs', prefArrayData.platform, prefArrayData.genres, prefArrayData.themes, prefArrayData.gamemodes, 'age_ratings, follows, involved_companies, game_modes, category, total_rating', 25, 'IGDB Rating', 'desc')
			await axios(userPrefSearchConfig)
				.then((response) => {
					console.log(response.data)
					// const resultPrefList: PreferencesRecList = {
					// 	platform: response.data.filter((multiq: any) => multiq.name === 'Platforms').length !== 0 ? response.data.filter((multiq: any) => multiq.name === 'Platforms')[0].result : [],
					// 	genres: response.data.filter((multiq: any) => multiq.name === 'Genres').length !== 0 ? response.data.filter((multiq: any) => multiq.name === 'Genres')[0].result : [],
					// 	themes: response.data.filter((multiq: any) => multiq.name === 'Themes').length !== 0 ? response.data.filter((multiq: any) => multiq.name === 'Themes')[0].result : [],
					// 	gamemodes: response.data.filter((multiq: any) => multiq.name === 'Game Modes').length !== 0 ? response.data.filter((multiq: any) => multiq.name === 'Game Modes')[0].result : [],
					// }
					setUserPrefList(response.data)

					// setUserPrefList({
					// 	platform: response.data.filter((multiq: any) => multiq.name === 'Platforms').length !== 0 ? response.data.filter((multiq: any) => multiq.name === 'Platforms')[0].result : [],

					// })
					setLoading(false)
				})
				.catch((err) => {
					setError('Unable to retrieve recommendations based on your Profile Game Preferences')
					console.error(err)

				})
		}
	}

	useEffect(() => {
		if (data.status === 'authenticated') {
			getUserPrefProfile(userData.data.user.id, userData.data.user.profileid)
		}
	}, [data])

	return (
		<div>
			<div className='filter-recommend-wrap'>
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
			<div className='drop-wrap'>
				<ThemeProvider theme={theme}>
					<Autocomplete
						className='auto-comp'
						disablePortal
						id='combo-box'
						options={numOptions}
						value={limit}
						onChange={onLimitChange}
						sx={{ width: 150, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginRight: '0.75rem' }} renderInput={(params) => <TextField {...params} label="Limit" />} />
				</ThemeProvider>
			</div>
			<div className='explore-wrap'>
				<h3 className='title-recommend'>
						Based on Games You Like
				</h3>
				{userSimilarRecList ?
					<>
						{viewToggle === 'list' ?
							<div className='grid-wrapper'>
								{userSimilarRecList.map((item: any) => (
									<IndGame key={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} />
								))}
							</div>
							: <IndGameTable multiResp={userSimilarRecList} />}
					</>
					: <></>
			</div>
			{!loading && userPrefList ?
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
											<IndGame key={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} />
										))}
									</div>
									: <IndGameTable multiResp={item.result} />}
							</div>
						</div>

					))}
				</>
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

export { Recommend }