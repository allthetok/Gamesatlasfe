import React, { useState, useEffect } from 'react'
import './SuggestionList.css'
import { createGameDtlConfig } from '../../helpers/fctns'
import { SimpleSearchConfig } from '../../helpers/fetypes'

type SuggestionListProps = {
	searchterm: string
}



const SuggestionList = ({ searchterm }: SuggestionListProps) => {
	const [searchDataFetch, setSearchDataFetch] = useState('')
	const termSearchConfig = createGameDtlConfig('post','search', searchterm)

	const getSearchDtl = async (searchConfig: SimpleSearchConfig) => {
		await axios(searchConfig)
			.then((response) => {
				if (response.length !== 0) {
					setSearchDataFetch(response.data)
				}
				else {
					setSearchDataFetch
				}
			})
	}

	return (
		<div className='search-suggest'>
		</div>
	)
}

export { SuggestionList }