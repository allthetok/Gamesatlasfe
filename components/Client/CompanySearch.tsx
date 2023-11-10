/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { placeholderImages } from '../../assets/ratingsvglinks'
import './CompanySearch.css'

type CompanySearchProps = {
	name: string,
	url: string,
	officialSite: string,
	handleCompanyAdd: (companySuggest: string) => void,
}

const CompanySearch = ({ name, url, officialSite, handleCompanyAdd }: CompanySearchProps ) => {
	return (
		<div className='ind-company-suggest' onClick={() => handleCompanyAdd(name)}>
			<div className='company-logo-wrap'>
				<img className='comp-logo' alt={`${name} logo`} src={url}/>
				<p className='company-text'>{name}</p>
			</div>
			<a className='visit' href={officialSite} target='_blank' rel='noreferrer'>Visit
				<img className='link-external' alt={`Open Official ${name} Website`} src={placeholderImages.LinkButtons} />
			</a>
		</div>

	)
}

export { CompanySearch }