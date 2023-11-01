/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createGameDtlConfig } from '../../helpers/fctns'
import { SimpleSearchConfig, SearchResultsObj } from '../../helpers/fetypes'
import { suggest } from '../../mockdata/searchsuggest'
import { Suggestion } from './Suggestion'
import './SuggestionList.css'

type SuggestionListProps = {
	searchterm: string
}

const SuggestionList = ({ searchterm }: SuggestionListProps) => {
	const [searchDataFetch, setSearchDataFetch] = useState<SearchResultsObj[]>([])
	const termSearchConfig = createGameDtlConfig('post', 'search', searchterm!)

	const getSearchDtl = async (searchConfig: SimpleSearchConfig) => {
		console.log(searchConfig)
		await axios(searchConfig)
			.then((response) => {
				if (response.data.length === 0 || response.status === 404) {
					return
				}
				else {
					response.data.sort((a: any, b: any) => (a.likes < b.likes) ? 1 : -1)
					setSearchDataFetch(response.data)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	useEffect(() => {
		if (searchterm !== '') {
			getSearchDtl(termSearchConfig)
		}
		else {
			setSearchDataFetch([])
		}
	}, [searchterm])

	return (
		<>
			{searchDataFetch.length !== 0 ?
				<div className='search-suggest'>
					{searchDataFetch.map((item: SearchResultsObj) => (
						<Suggestion key={item.id} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} releaseDate={item.releaseDate} title={item.title} category={item.category} companies={item.involved_companies} />
					))}
				</div>
				: <></>
			}
			{/* <div className='search-suggest'>
				{suggest.map((item: any) => (
					<Suggestion key={item.id} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} category={item.category} companies={item.involved_companies} />
				))}
			</div> */}
		</>
	)
}

export { SuggestionList }