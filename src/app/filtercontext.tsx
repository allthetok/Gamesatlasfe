/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react'
import { FilterContextObj } from '../../helpers/fetypes'

const FilterContext = createContext<FilterContextObj>({
	sortBy: '', setSortBy: () => { null },
	sortDirection: '', setSortDirection:  () => { null },
	platform: '', setPlatform: () => { null },
	limit: '', setLimit:  () => { null },
	genre: '', setGenre:  () => { null },
	viewToggle: '', setViewToggle:  () => { null }
})

const FilterParent = ({ children }: any) => {
	const [sortBy, setSortBy] = useState('IGDB Rating')
	const [sortDirection, setSortDirection] = useState('desc')
	const [platform, setPlatform] = useState('')
	const [limit, setLimit] = useState('25')
	const [genre, setGenre] = useState('')
	const [viewToggle, setViewToggle] = useState('list')

	return (
		<FilterContext.Provider value={{
			sortBy, setSortBy,
			sortDirection, setSortDirection,
			platform, setPlatform,
			limit, setLimit,
			genre, setGenre,
			viewToggle, setViewToggle
		}}>
			{children}
		</FilterContext.Provider>
	)
}

const useFilterContext = () => useContext(FilterContext)

export { FilterParent, useFilterContext }