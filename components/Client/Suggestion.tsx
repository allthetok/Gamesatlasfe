/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
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
	title: string,
	category: string,
	companies: Companies[]
}

const Suggestion = ({ id, cover, platforms, rating, releaseDate, title, category, companies }: SuggestionProps ) => {
	return (
		<Link href={`/game/${title}`} className='no-text-dec'>
			<div className='ind-suggest'>
				<div className='cover-wrap'>
					<img className='cover-logo' alt={`${title} cover`} src={cover}/>
					<p className='title-text'>{title}</p>
				</div>
				{companies.length !== 0 ? companies.map((val: Companies) => (
					// <a key={val.name} className='tag-link-dev' href={val.officialSite} target='_blank'> {val.name} </a>
					<p key={val.name} className='tag-link-dev'> {val.name} </p>

				))
					: <p key={'None'} className='tag-link-dev'></p>}
				{/* <a className='tag-link-category'>{category}</a> */}
				<p className='tag-link-category'>{category}</p>
				<div className='suggest-platforms'>
					{platforms.map((val: Platforms) => (
						<img key={val.id} className='suggest-platform' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />
					))}
				</div>
				<div className='suggest-formatted'>
					<span className='suggest-rating'>
						{rating > 0 ? Math.round(rating) : 'N'}
					</span>
					<span className='suggest-release'>
						{formattedYear(releaseDate)}
					</span>
				</div>
			</div>
		</Link>

	)
}

export { Suggestion }