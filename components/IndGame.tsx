/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { SvgIcon } from '@mui/material'
import { multiResponse } from '../mockdata/multi'
import { ESRB, PEGI } from '../assets/ratingsvglinks'
import { formattedYear } from '../helpers/fctns'
import { AgeRatings } from '../../backendga/helpers/requests'
import { FavoriteIconSx } from '../sxstyling/styles'
import './IndGame.css'

type IndGameProps = {
	cover: string,
	platforms: any[],
	rating: number,
	age_ratings: AgeRatings,
	releaseDate: string,
	likes: string,
	title: string
}

const IndGame = ({ cover, platforms, rating, age_ratings, releaseDate, likes, title }: IndGameProps) => {
	return (
		<div>
			<div className='ind-wrapper'>
				<div className='card-game'>
					<img className='card-img' src={multiResponse[0].cover} />
					<div className='card-body'>
						<div className='card-stack'>
							<div className='card-platforms'>
								{multiResponse[0].platforms.map((val: any) => (
									<img key={val.id} className='card-platformlogo' alt={`${val.name} Logo`} src={val.url} />
								))}
							</div>
							<span className='card-rating'>{Math.round(multiResponse[0].rating)}</span>
						</div>
						<div className='card-stack'>
							<div className='card-platforms'>
								<img className='card-logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === multiResponse[0].age_ratings.ESRB)[0].src} />
								<img className='card-logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === multiResponse[0].age_ratings.PEGI)[0].src} />
							</div>
							<span className='card-year'>{formattedYear(multiResponse[0].releaseDate)}</span>
						</div>
						<div className='card-likesstack'>
							<div className='card-heart'>
								<SvgIcon sx={FavoriteIconSx} htmlColor='#d2042d' fontSize='large'>
									<FavoriteIcon/>
								</SvgIcon>
								<span className='like-text'>Like this game</span>
							</div>
							<span className='card-likes'>{multiResponse[0].likes}</span>
						</div>
						<h2 className='card-heading'>
							{multiResponse[0].title}
						</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export { IndGame }