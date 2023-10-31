import React from 'react'
import { Companies, Platforms } from '../../../backendga/helpers/betypes'
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
		<span className='ind-suggest'>
			{title}
		</span>
	)
}

export { Suggestion }