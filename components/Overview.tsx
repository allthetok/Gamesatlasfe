/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useContext } from 'react'
import { Rating } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import StarIcon from '@mui/icons-material/Star'
import { AgeRatings, Categories, Companies, Platforms, Videos, Languages } from '../../backendga/helpers/requests'
import { ratingFloatToStar, formattedDateLong } from '../helpers/fctns'
import { GameDetailObj } from '../helpers/types'
import './GameDtl.css'
import { ContextDtl, useGameContext } from '@/app/gamecontext'

type OverViewProps = {
	getPlatformCompanies: (platformsArr: Platforms[] | Companies[]) => React.JSX.Element,
	getAgeRatings: (ratingsObj: AgeRatings) => React.JSX.Element,
	getStringArr: (stringArr: string[]) => React.JSX.Element,
	getWebsites: (categoriesArr: Categories[], specified: string) => React.JSX.Element,
}

const Overview = ({ getPlatformCompanies, getAgeRatings, getStringArr, getWebsites }: OverViewProps) => {
	//const response: GameDetailObj = useContext(GameContext)
	type GameContextObj = {
		dataFetch: GameDetailObj | undefined,
		error: null,
		loading: boolean
	}
	const { dataFetch, error, loading } = useGameContext()

	return (
		<div>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error ?
				<div id='infoBlock' className='game-info mb'>
					<div className='info-box'>
						<div>
							<img className='img-box' alt='Cover Art of Game' src={dataFetch?.cover}/>
						</div>
					</div>
					<div className='info-releaservw'>
						<dl className='releasedata'>
							<dt>Released</dt>
							<dd>
								{formattedDateLong(dataFetch!.releaseDate)}
							</dd>
							<dt>Platforms</dt>
							<dd className='platforms'>
								{getPlatformCompanies(dataFetch!.platforms)}
							</dd>
							<dt>Developers & Publishers</dt>
							<dd className='platforms'>
								{getPlatformCompanies(dataFetch!.involved_companies)}
							</dd>
							<dt>Age Ratings</dt>
							<dd>
								{getAgeRatings(dataFetch!.age_ratings)}
							</dd>
							<dt>Localizations</dt>
							<dd>
								{dataFetch?.game_localizations}
							</dd>
						</dl>
					</div>
					<div className='info-scores'>
						<dl className='releasedata'>
							<dt>IGDB Rating</dt>
							<dd className='stars-rating'>
								<Rating
									name='rating'
									value={ratingFloatToStar(dataFetch!.rating)}
									readOnly
									precision={0.1}
									emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
									size='small'
								/>
								<p className='max-rating align'>
							({dataFetch?.ratingCount})
								</p>
							</dd>
							<dt>User Reviews</dt>
							<dd>
								<span className='avg-rating'>
									{parseFloat(dataFetch!.rating.toString()).toFixed(2)}
								</span>
								<span className='max-rating'>
							&nbsp;/ 100 based on
								</span>
								<span className='num-rating'>
							&nbsp;{dataFetch?.ratingCount}
								</span>
						&nbsp;
								<span className='max-rating'>
							reviews
								</span>
							</dd>
							<dt>Hypes</dt>
							<dd>
						Hyped by {dataFetch?.hypes} users pre-release!
							</dd>
							<dt>Follows</dt>
							<dd>
						Followed by {dataFetch?.likes} users
							</dd>
							<dt>IGDB ID</dt>
							<dd>
								{dataFetch?.id}
							</dd>
							<dt>IGDB Official Website</dt>
							<dd>
								<a href={dataFetch?.url} target='_blank' rel='noreferrer'>{dataFetch?.title}</a>
							</dd>
						</dl>
					</div>
					<div className='info-genres'>
						<dl className='releasedata'>
							<dt>Genres</dt>
							<dd>
								{getStringArr(dataFetch!.genres)}
							</dd>
							<dt>Gameplay Perspective</dt>
							<dd>
								{getStringArr(dataFetch!.player_perspectives)}
							</dd>
							<dt>Game Modes</dt>
							<dd>
								{getStringArr(dataFetch!.game_modes)}
							</dd>
							<dt>Themes</dt>
							<dd>
								{getStringArr(dataFetch!.themes)}
							</dd>
							<dt>Keywords</dt>
							<dd>
								{getStringArr(dataFetch!.keywords)}
							</dd>
						</dl>
					</div>
					<div className='info-sites'>
						<dl className='releasedata'>
							<dt>Buy</dt>
							<dd>
								{getWebsites(dataFetch!.external_games, 'External')}
							</dd>
							<dt>Official Sites</dt>
							<dd>
								{getWebsites(dataFetch!.websites, 'Official')}
							</dd>
						</dl>
					</div>
				</div>
				:
				<></>
			}
		</div>

	)
}

export { Overview }