/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { createUserPrefSearchConfig, createUserRecommendConfig } from '../../helpers/fctns'
import { PreferencesRecList, ProfilePrefSearchConfig, SimpleUserLikeConfig } from '../../helpers/fetypes'
import { useSession } from 'next-auth/react'
import ReactLoading from 'react-loading'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import { Button, SvgIcon } from '@mui/material'
import { ListTblToggleSx, IconSx } from '../../sxstyling/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import './Recommend.css'
import './IndGameList.css'

type RecommendProps = {
	userData: any
}

const Recommend = ({ userData }: RecommendProps) => {
	const [loading, setLoading] = useState(true)
	const [userPrefData, setUserPrefData] = useState({ platform: [], genres: [], themes: [], gamemodes: [] })
	const [userPrefRecList, setUserPrefRecList] = useState<PreferencesRecList[] | null>(null)
	const [userSimilarRecList, setUserSimilarRecList] = useState()
	const [error, setError] = useState('')
	const [viewToggle, setViewToggle] = useState('table')

	const data = useSession()

	const getUserPrefProfile = async (userid: string, profileid: string) => {
		const profileSearchConfig = {
			method: 'post',
			url: 'http://localhost:5000/api/profileDetails',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'userid': Number(userid),
				'profileid': Number(profileid)
			}
		}
		await axios(profileSearchConfig)
			.then((response: any) => {
				const prefData = response.data
				console.log(prefData)
				setUserPrefData(prefData)
			})
			.catch((err: any) => {
				console.log(err)
			})
	}

	const getRecommendationList = useCallback(async () => {
		const userLikeConfig: SimpleUserLikeConfig = createUserRecommendConfig('post', 'recommendLikes', userData.data.user.id)
		await axios(userLikeConfig)
			.then((response) => {
				console.log(response.data)
				console.log(response.data[0].recommendobjarr.concat(response.data[1].recommendobjarr))
				setUserSimilarRecList(response.data)
				// setLoading(false)
			})
			.catch((err) => {
				setError('Unable to retrieve recommendations based on your Profile Game Preferences')
				console.error(err)
			})

		if (userPrefData.platform.length !== 0 || userPrefData.genres.length !== 0 || userPrefData.themes.length !== 0 || userPrefData.gamemodes.length !== 0) {
			const userPrefSearchConfig: ProfilePrefSearchConfig = createUserPrefSearchConfig('post', 'recommendPrefs', userPrefData.platform, userPrefData.genres, userPrefData.themes, userPrefData.gamemodes, 'age_ratings, follows, involved_companies, game_modes, category, total_rating', 25, 'IGDB Rating', 'desc')
			await axios(userPrefSearchConfig)
				.then((response) => {
					console.log(response.data)
					setUserPrefRecList(response.data)
					setLoading(false)
				})
				.catch((err) => {
					setError('Unable to retrieve recommendations based on your Profile Game Preferences')
					console.error(err)

				})
		}
	}, [userPrefData])

	useEffect(() => {
		if (data.status === 'authenticated') {
			getUserPrefProfile(userData.data.user.id, userData.data.user.profileid)
		}
	}, [data])

	useEffect(() => {
		getRecommendationList()
	}, [getRecommendationList])

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
			{!loading && userPrefRecList ?
				<>
					{userPrefRecList.map((item: any) => (
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