/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { formattedYear } from '../../helpers/fctns'
import { Companies, Platforms } from '../../../backendga/helpers/betypes'
import { placeholderImages } from '../../assets/ratingsvglinks'

import './Suggestion.css'

type SuggestionProps = {
	id: number,
	cover: string,
	platforms: Platforms[],
	rating: number,
	releaseDate: string,
	likes: number,
	title: string,
	category: number,
	companies: Companies[]
}

const Suggestion = ({ id, cover, platforms, rating, releaseDate, likes, title, category, companies }: SuggestionProps ) => {
	return (
		<div className='ind-suggest'>
			<div className='cover-wrap'>
				<img className='cover-logo' alt={`${title} cover`} src={cover}/>
				<p className='title-text'>{title}</p>
			</div>
			{companies.map((val: Companies) => (
				<a key={val.name} className='tag-link-company' href={val.officialSite} target='_blank'> {val.name} </a>
			))}
			<a className='tag-link-category'>{category}</a>
			<div className='suggest-platforms'>
				{platforms.slice(0,3).map((val: Platforms) => (
					<img key={val.id} className='suggest-platform' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />
				))}
			</div>
			<div className='suggest-formatted'>
				<span className='suggest-rating'>
					{rating ? Math.round(rating) : 'N/A'}
				</span>
				<span className='suggest-release'>
					{formattedYear(releaseDate)}
				</span>
			</div>
		</div>
	)
}

export { Suggestion }