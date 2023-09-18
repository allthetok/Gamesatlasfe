/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { GameDetailObj } from '../../helpers/types'

type GameContextObj = {
	dataFetch: GameDetailObj | undefined,
	error: null,
	loading: boolean
}

const GameContext = createContext<GameContextObj>({ dataFetch: undefined, error: null, loading: false })

const ContextDtl = ({ children }: any) => {
	const [gameSearch, setGameSearch] = useState('')
	const { dataFetch, error, loading } = useSearch({ gameSearch: 'sekiro' })
	return (
		<GameContext.Provider value={{ dataFetch, error, loading }}>
			{children}
		</GameContext.Provider>
	)
}

const useGameContext = () => useContext(GameContext)

export { ContextDtl, useGameContext }


