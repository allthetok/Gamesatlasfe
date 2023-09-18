/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'
type TSearchContext = {
	gameSearch: string,
	setGameSearch: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<TSearchContext>({
	gameSearch: '',
	setGameSearch: () => {},
})

const ContextSear = ({ children }: any) => {
	const [gameSearch, setGameSearch] = useState('')
	return (
		<SearchContext.Provider value={{ gameSearch, setGameSearch }}>
			{children}
		</SearchContext.Provider>
	)
}

const useSearchContext = () => useContext(SearchContext)

export { ContextSear, useSearchContext }


