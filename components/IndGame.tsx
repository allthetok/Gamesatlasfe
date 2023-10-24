/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Button, SvgIcon } from '@mui/material'
import { ESRB, PEGI, placeholderImages } from '../assets/ratingsvglinks'
import { formattedYear } from '../helpers/fctns'
import { AgeRatings } from '../../backendga/helpers/betypes'
import { IconSx } from '../sxstyling/styles'
import './IndGame.css'

type IndGameProps = {
	cover: string,
	platforms: any[],
	rating: number,
	age_ratings: AgeRatings,
	releaseDate: string | Date,
	likes: number,
	title: string,
	genres: any[],
	companies: any[]
}

const IndGame = ({ cover, platforms, rating, age_ratings, releaseDate, likes, title, genres, companies }: IndGameProps) => {
	return (
		<div>
			<div className='ind-wrapper'>
				<div className='card-game'>
					<img className='card-img' src={cover} />
					<div className='card-body'>
						{/* <div className='card-stack'> */}
						{/* </div> */}
						<div className='card-stack'>
							<div className='card-platforms'>
								{platforms.map((val: any) => (
									<img key={val.id} className='card-platformlogo' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />
								))}
							</div>
							<span className='card-rating'>{Math.round(rating)}</span>
						</div>
						<div className='card-stack'>
							<div className='card-platforms'>
								<img className='card-logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === age_ratings.ESRB)[0] ? ESRB.filter((rating) => rating.IGDBRating === age_ratings.ESRB)[0].src : ESRB.filter((rating) => rating.IGDBRating === 7)[0].src} />
								<img className='card-logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === age_ratings.PEGI)[0] ? PEGI.filter((rating) => rating.IGDBRating === age_ratings.PEGI)[0].src : PEGI.filter((rating) => rating.IGDBRating === 7)[0].src} />
							</div>
							<span className='card-year'>{formattedYear(releaseDate)}</span>
						</div>
						<div className='card-likesstack'>
							<div className='card-heart'>
								<SvgIcon sx={IconSx} htmlColor='#d2042d' fontSize='large'>
									<FavoriteIcon/>
								</SvgIcon>
								<span className='like-text'>Like this game</span>
							</div>
							<span className='card-likes'>{likes}</span>
						</div>
						<h2 className='card-heading'>
							{title}
						</h2>
						{/* <div className='card-companies'>
							{companies.map((val: any) => (
								<a key={val.name} className='tag-link-company' href={val.officialSite} target='_blank'> {val.name}</a>
							))}
						</div> */}
						<div className='card-companies'>
							{genres.map((val: any) => (
								<a key={val.id} className='tag-link-company'> {val.name}</a>

								// <div className='tags'>
								// 	<span className='tag-text'>{val.name}</span>
								// 	<a key={val.id} className='tag-link-company'> {val.name}</a>
								// </div>
							))}
							{companies.map((val: any) => (
								<a key={val.name} className='tag-link-company' href={val.officialSite} target='_blank'> {val.name} </a>
								// <div className='tags'>
								// 	<span className='tag-text'>{val.name}</span>
								// 	<a key={val.name} className='tag-link-company' href={val.officialSite} target='_blank'> {val.name}</a>
								// </div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { IndGame }