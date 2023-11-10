/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react'
import { AdvFilterContextObj } from '../../helpers/fetypes'

const AdvFilterContext = createContext<AdvFilterContextObj>({
	dateYear: [], setDateYear: () => { null },
	rating: [], setRating: () => { null },
	platforms: [], setPlatforms: () => { null },
	genres: [], setGenres: () => { null },
	themes: [], setThemes: () => { null },
	gameModes: [], setGameModes: () => { null },
	categories: [], setCategories: () => { null },
	companyList: [], setCompanyList: () => { null },
})

const AdvFilterParent = ({ children }: any) => {
	const [dateYear, setDateYear] = useState<number[]>([1972,2023])
	const [rating, setRating] = useState<number[]>([0,100])
	const [platforms, setPlatforms] = useState<string[]>([])
	const [genres, setGenres] = useState<string[]>([])
	const [themes, setThemes] = useState<string[]>([])
	const [gameModes, setGameModes] = useState<string[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [companyList, setCompanyList] = useState<string[]>([])

	return (
		<AdvFilterContext.Provider value={{
			dateYear, setDateYear,
			rating, setRating,
			platforms, setPlatforms,
			genres, setGenres,
			themes, setThemes,
			gameModes, setGameModes,
			categories, setCategories,
			companyList, setCompanyList
		}}>
			{children}
		</AdvFilterContext.Provider>
	)
}

const useAdvFilterContext = () => useContext(AdvFilterContext)

export { AdvFilterParent, useAdvFilterContext }