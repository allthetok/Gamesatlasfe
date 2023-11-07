/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createInnerSearchConfig } from '../../helpers/fctns'
import { SimpleSearchConfig, SearchResultsObj, SimpleNullableSearchConfig } from '../../helpers/fetypes'
import { Companies } from '../../../backendga/helpers/betypes'
import { AdvCSearch } from './AdvCSearch'
import './AdvCSearchList.css'

type AdvCSearchListProps = {
	searchterm: string,
	handleCompanyAdd: (companySuggest: string) => void,
}

const AdvCSearchList = ({ searchterm, handleCompanyAdd }: AdvCSearchListProps) => {
	const [searchDataFetch, setSearchDataFetch] = useState<Companies[]>([])
	const termSearchConfig = createInnerSearchConfig('post', 'companysearch', searchterm!, 'name, logo')

	const getSearchDtl = async (searchConfig: SimpleNullableSearchConfig) => {
		console.log(searchConfig)
		await axios(searchConfig)
			.then((response) => {
				if (response.data.length === 0 || response.status === 404) {
					return
				}
				else {
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
				<div className='company-suggest'>
					{searchDataFetch.map((item: Companies) => (
						<AdvCSearch key={item.name} name={item.name} url={item.url} officialSite={item.officialSite} handleCompanyAdd={handleCompanyAdd} />
					))}
				</div>
				: <></>
			}
		</>
	)
}

export { AdvCSearchList }