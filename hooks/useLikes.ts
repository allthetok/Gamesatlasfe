import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createUserGenericConfig } from '../helpers/fctns'

type UseLikesProps = {
	userid: string | null | undefined
}

const useLikes = ({ userid }: UseLikesProps) => {
	const [likeDataFetch, setLikeDataFetch] = useState<any[]>([])
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
		console.log('effect fired')
		if (userid !== undefined && userid !== null) {
			getLikes(userid)
		}
	}, [userid])

	return { likeDataFetch, error, loading }
}

export { useLikes }