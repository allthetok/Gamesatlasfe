import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createUserGenericConfig } from '../helpers/fctns'

const useLikes = (userid: string | null | undefined) => {
	const [likeDataFetch, setLikeDataFetch] = useState<{likeid: number, gameobj: any}[]>([])
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(true)

	const getLikes = async (userid: string) => {
		const likeSearchConfig = createUserGenericConfig('post', 'userLikes', userid)
		await axios(likeSearchConfig)
			.then((response: AxiosResponse) => {
				setLikeDataFetch(response.data)
				setLoading(false)
			})
			.catch((err: AxiosError) => {
				setLoading(false)
				setError('Unable to retrieve your likes')
			})
	}

	useEffect(() => {
		if (userid !== undefined && userid !== null) {
			getLikes(userid)
		}
	}, [userid])

	return { likeDataFetch, error, loading }
}

export { useLikes }