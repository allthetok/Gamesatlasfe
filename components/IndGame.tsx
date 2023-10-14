/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { multiResponse } from '../mockdata/multi'
import { ESRB, PEGI } from '../assets/ratingsvglinks'
import { formattedYear } from '../helpers/fctns'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { SvgIcon } from '@mui/material'

import './IndGame.css'

const IndGame = () => {
	return (
		<div>
			<div className='ind-wrapper'>
				<div className='card-game'>
					<img className='card-img' src={multiResponse[0].cover} />
					<div className='card-body'>
						<div className='card-stack'>
							<div className='card-platforms'>
								{multiResponse[0].platforms.map((val: any) => (
									<img key={val.id} className='card-logo' alt='Logo of Company' src={val.url} />
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
						<SvgIcon htmlColor='red'>
							<FavoriteIcon/>
						</SvgIcon>
						<span className='card-year'>{multiResponse[0].likes}</span>
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