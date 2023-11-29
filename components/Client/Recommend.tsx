/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { createUserPrefSearchConfig } from '../../helpers/fctns'
import { PreferencesRecList, ProfilePrefSearchConfig } from '../../helpers/fetypes'
import { useSession } from 'next-auth/react'
import ReactLoading from 'react-loading'
import './Recommend.css'

type RecommendProps = {
	userData: any
}

const Recommend = ({ userData }: RecommendProps) => {
	const [loading, setLoading] = useState(true)
	const [userPrefData, setUserPrefData] = useState({ platform: [], genres: [], themes: [], gamemodes: [] })
	const [userPrefRecList, setUserPrefRecList] = useState<PreferencesRecList | null>(null)
	const [error, setError] = useState('')

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
			Recommendations
			{!loading ?
				<></>
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