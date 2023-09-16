/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useState } from 'react'
import axios from 'axios'
import { response } from '../../mockdata/response'
import { useSearch } from '../../hooks/useSearch'
import { GameDetailObj } from '../../helpers/types'

// const GameContext = createContext(response)
// const getResponseObj = async (searchTerm: string) => {
// 	const searchConfig = {
// 		method: 'post',
// 		url: 'http://localhost:3001/api/gamedetails',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		data : {
// 			searchterm: 'witcher'
// 		}
// 	}

// 	await axios(searchConfig)
// 		.then((res) => {
// 			console.log(res.data)
// 		})
// 		.catch((err) => {
// 			console.log(err)
// 		})
// 	return response
type GameContextObj = {
	dataFetch: GameDetailObj | undefined,
	error: null,
	loading: boolean
}

// const createGameContext = () => {
// 	const { dataFetch, error, loading }: GameContextObj = useSearch({ gameSearch: 'sekiro' })
// }

// const GameContext = createContext(() => {
// 	const { dataFetch, error, loading }: GameContextObj = useSearch({ gameSearch: 'sekiro' })
// 	const dataFetchObj: GameContextObj = {
// 		dataFetch: dataFetch,
// 		error: error,
// 		loading: loading
// 	}
// 	return dataFetchObj
// 	// return { dataFetch, error, loading }
// })

// const GameContext = createContext(getResponseObj('sekiro'))

const GameContext = createContext<GameContextObj>({ dataFetch: undefined, error: null, loading: false })

const ContextDtl = ({ children }: any) => {
	const { dataFetch, error, loading } = useSearch({ gameSearch: 'sekiro' })
	return (
		<GameContext.Provider value={{ dataFetch, error, loading }}>
			{children}
		</GameContext.Provider>
	)
}

const useGameContext = () => useContext(GameContext)

export { ContextDtl, useGameContext }


