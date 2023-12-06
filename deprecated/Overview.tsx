/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { GenericStringObj, OverviewObj, AgeRatings, Categories, Companies, GameObj, Platforms } from '../helpers/fetypes'
import { ratingFloatToStar, formattedDateLong } from '../helpers/fctns'
import { useGameContext } from '@/app/gamecontext'
import { Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import './GameDtl.css'

type OverviewProps = {
	dataFetch: GameObj,
	loading: boolean,
	error: null,
	getPlatformCompanies: (platformsArr: Platforms[] | Companies[]) => React.JSX.Element,
	getAgeRatings: (ratingsObj: AgeRatings) => React.JSX.Element,
	getGenericArr: (stringArr: GenericStringObj[]) => React.JSX.Element,
	getStringArr: (stringArr: string[]) => React.JSX.Element,
	getWebsites: (categoriesArr: Categories[], specified: string) => React.JSX.Element,
}

const Overview = ({ dataFetch, loading, error, getPlatformCompanies, getAgeRatings, getGenericArr, getStringArr, getWebsites }: OverviewProps) => {
	//const response: GameDetailObj = useContext(GameContext)
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	return (
		<div>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error && dataFetch ?
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
								{formattedDateLong(dataFetch.releaseDate)}
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
								{dataFetch?.game_localizations.map((indLocal: any) => (
									<p key={indLocal.region}>{indLocal.name} ({indLocal.region})</p>
								))}
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
								{getGenericArr(dataFetch!.genres)}
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
								{getGenericArr(dataFetch!.themes)}
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