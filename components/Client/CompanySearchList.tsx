/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createInnerSearchConfig } from '../../helpers/fctns'
import { SimpleNullableSearchConfig, Companies } from '../../helpers/fetypes'
import { CompanySearch } from './CompanySearch'
import './CompanySearchList.css'

type CompanySearchListProps = {
	searchterm: string,
	handleCompanyAdd: (companySuggest: string) => void,
}

const CompanySearchList = ({ searchterm, handleCompanyAdd }: CompanySearchListProps) => {
	const [searchDataFetch, setSearchDataFetch] = useState<Companies[]>([])
	const termSearchConfig = createInnerSearchConfig('post', 'companysearch', searchterm!, 'name, logo')

	const getSearchDtl = async (searchConfig: SimpleNullableSearchConfig) => {
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
						<CompanySearch key={item.name} name={item.name} url={item.url} officialSite={item.officialSite} handleCompanyAdd={handleCompanyAdd} />
					))}
				</div>
				: <></>
			}
		</>
	)
}

export { CompanySearchList }