/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { GameDetailObj } from '../../helpers/fetypes'
import { ContextSear, useSearchContext } from './searchcontext'

type GameContextObj = {
	dataFetch: GameDetailObj | undefined,
	error: null,
	loading: boolean
}

const GameContext = createContext<GameContextObj>({ dataFetch: undefined, error: null, loading: false })

const ContextDtl = ({ children }: any) => {
	const { gameSearch } = useSearchContext()

	// const { dataFetch, error, loading } = useSearch({ gameSearch: 'sekiro' })
	console.log(gameSearch)
	const { dataFetch, error, loading } = useSearch({ gameSearch })
	return (
		<ContextSear>
			<GameContext.Provider value={{ dataFetch, error, loading }}>
				{children}
			</GameContext.Provider>
		</ContextSear>
	)
}

const useGameContext = () => useContext(GameContext)

export { ContextDtl, useGameContext }


