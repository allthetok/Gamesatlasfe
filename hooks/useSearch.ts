/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import { GameDetailObj } from '../helpers/types'
import axios from 'axios'

type UseSearchProps = {
	gameSearch: string | null | undefined
}

const useSearch = ({ gameSearch	}: UseSearchProps) => {
	const [dataFetch, setDataFetch] = useState<GameDetailObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/gamedetails',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'searchterm': gameSearch
		}
	}

	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)

			})
	}, [gameSearch])

	useEffect(() => {
		console.log('effect fired')
		getGameDtl()
	}, [getGameDtl])

	return { dataFetch, error, loading }
}

export { useSearch }