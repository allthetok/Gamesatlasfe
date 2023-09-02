/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { Rating } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import StarIcon from '@mui/icons-material/Star'
import { AgeRatings, Categories, Companies, Platforms, Videos, Languages } from '../../backendga/helpers/requests'
import { GameDetailObj } from '../helpers/types'
import './GameDtl.css'

type OverViewProps = {
	response: GameDetailObj,
	formattedDateLong: (inpDate: string) => string,
	getPlatformCompanies: (platformsArr: Platforms[] | Companies[]) => React.JSX.Element,
	getAgeRatings: (ratingsObj: AgeRatings) => React.JSX.Element,
	getStringArr: (stringArr: string[]) => React.JSX.Element,
	getWebsites: (categoriesArr: Categories[], specified: string) => React.JSX.Element,
	ratingFloatToStar: (rating: number) => number,
}

const Overview = ({ response, formattedDateLong, getPlatformCompanies, getAgeRatings, getStringArr, getWebsites, ratingFloatToStar }: OverViewProps) => {
	return (
		<div id='infoBlock' className='game-info mb'>
			<div className='info-box'>
				<div>
					<img className='img-box' alt='Cover Art of Game' src={response.cover}/>
				</div>
			</div>
			<div className='info-releaservw'>
				<dl className='releasedata'>
					<dt>Released</dt>
					<dd>
						{formattedDateLong(response.releaseDate)}
					</dd>
					<dt>Platforms</dt>
					<dd className='platforms'>
						{getPlatformCompanies(response.platforms)}
					</dd>
					<dt>Developers & Publishers</dt>
					<dd className='platforms'>
						{getPlatformCompanies(response.involved_companies)}
					</dd>
					<dt>Age Ratings</dt>
					<dd>
						{getAgeRatings(response.age_ratings)}
					</dd>
					<dt>Localizations</dt>
					<dd>
						{response.game_localizations}
					</dd>
				</dl>
			</div>
			<div className='info-scores'>
				<dl className='releasedata'>
					<dt>IGDB Rating</dt>
					<dd className='stars-rating'>
						<Rating
							name='rating'
							value={ratingFloatToStar(response.rating)}
							readOnly
							precision={0.1}
							emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
							size='small'
						/>
						<p className='max-rating align'>
								({response.ratingCount})
						</p>
					</dd>
					<dt>User Reviews</dt>
					<dd>
						<span className='avg-rating'>
							{parseFloat(response.rating.toString()).toFixed(2)}
						</span>
						<span className='max-rating'>
								&nbsp;/ 100 based on
						</span>
						<span className='num-rating'>
								&nbsp;{response.ratingCount}
						</span>
							&nbsp;
						<span className='max-rating'>
								reviews
						</span>
					</dd>
					<dt>Hypes</dt>
					<dd>
							Hyped by {response.hypes} users pre-release!
					</dd>
					<dt>Follows</dt>
					<dd>
							Followed by {response.likes} users
					</dd>
					<dt>IGDB ID</dt>
					<dd>
						{response.id}
					</dd>
					<dt>IGDB Official Website</dt>
					<dd>
						<a href={response.url} target='_blank' rel='noreferrer'>{response.title}</a>
					</dd>
				</dl>
			</div>
			<div className='info-genres'>
				<dl className='releasedata'>
					<dt>Genres</dt>
					<dd>
						{getStringArr(response.genres)}
					</dd>
					<dt>Gameplay Perspective</dt>
					<dd>
						{getStringArr(response.player_perspectives)}
					</dd>
					<dt>Game Modes</dt>
					<dd>
						{getStringArr(response.game_modes)}
					</dd>
					<dt>Themes</dt>
					<dd>
						{getStringArr(response.themes)}
					</dd>
					<dt>Keywords</dt>
					<dd>
						{getStringArr(response.keywords)}
					</dd>
				</dl>
			</div>
			<div className='info-sites'>
				<dl className='releasedata'>
					<dt>Buy</dt>
					<dd>
						{getWebsites(response.external_games, 'External')}
					</dd>
					<dt>Official Sites</dt>
					<dd>
						{getWebsites(response.websites, 'Official')}
					</dd>
				</dl>
			</div>
		</div>
	)
}

export { Overview }