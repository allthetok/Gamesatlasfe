import React, { useState } from 'react'
import { response } from '../mockdata/response'
import { IconButton, Rating, Box } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import StarIcon from '@mui/icons-material/Star'
import { GameDetailObj, AgeRatings, Categories, Companies, Platforms, Videos, Languages } from '../../../backendga/helpers/requests'
import { ESRB, PEGI } from '../assets/ratingsvglinks'

import './GameDtl.css'

const GameDtl = () => {

	const getPlatformCompanies = (platformsArr: Platforms[] | Companies[]) => {
		return (
			<>
				{platformsArr.map((val: Platforms | Companies) => (
					<div className='platforms' key={val.name}>
						<img className='logo' src={val.url} />
						<p className='ptext'>{val.name}</p>
					</div>
				))}
			</>
		)
	}

	const getAgeRatings = (ratingsObj: AgeRatings) => {
		return (
			<>
				<div className='platforms'>
					<img className='logo' src={ESRB.filter((rating) => rating.IGDBRating === ratingsObj.ESRB)[0].src} />
					<p className='ptext'>ESRB Rating</p>
				</div>
				<div className='platforms'>
					<img className='logo' src={PEGI.filter((rating) => rating.IGDBRating === ratingsObj.PEGI)[0].src} />
					<p className='ptext'>PEGI Rating</p>
				</div>
			</>
		)
	}

	const getStringArr = (stringArr: string[]): React.JSX.Element => {
		return (
			<>
				{stringArr.map((val: string) => (
					<div key={val}>
						<a href=''>{val}</a>
					</div>
				))}
			</>
		)
	}

	const ratingFloatToStar = (rating: number) : number => rating / 20

	const formattedDateLong = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })


	return (
		<div className='header-wrapper'>
			<div className='title'>
				<div className='mb'>
					<h1>
						{response.title}
					</h1>
				</div>
				<div className='flex flex-end'>
					<div className='titleactions'>
						<div className='collection'>
							<div>
								<b>Add To</b>
								<br/>
								<a className='addto' href=''>
									<div className='smfont'>My List</div>
									<IconButton sx={{ color: '#ddd' }}>
										<AddBoxIcon/>
									</IconButton>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul className='nav-tabs mb'>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Overview</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Artworks</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Screenshots</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Similar Games</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Videos</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Community Websites</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Language Details</a>
				</li>
			</ul>
			<div id='infoBlock' className='game-info mb'>
				<div className='info-box'>
					<div>
						<img className='img-box' src={response.cover}/>
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
				<div className='info-box'>
					<div>
						<img className='img-box' src={response.cover}/>
					</div>
				</div>
				<div className='info-scores'>
					<dl className='releasedata'>
						<dt>IGDB Rating</dt>
						<dd className='stars-rating'>
							<Rating
								name='rating'
								value={ratingFloatToStar(response.rating)}
								readOnly
								precision={0.001}
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
			</div>


			{/* <div className='row'>
				<div className='span8'>
					<table className='table table-bordered'>
						<tbody className='tbody'>
							<tr>
								<td className='span3'>Game ID</td>
								<td>{response.id}</td>
							</tr>
							<tr>
								<td>Game Mode</td>
								<td>{response.game_modes}</td>
							</tr>
							<tr>
								<td>Genres</td>
								<td>{response.genres.join(', ')}</td>
							</tr>
							<tr>
								<td>Developers</td>
								<td>{response.involved_companies.map(val => val.name).join(', ')}</td>
							</tr>
							<tr>
								<td>Keywords</td>
								<td>{response.keywords.join(', ')}</td>
							</tr>
							<tr>
								<td>Platforms</td>
								<td className='platforms'>
									{/* {getPlatforms(response.platforms)} */}
			{/* </td>
							</tr>
							<tr>
								<td>Player Perspective</td>
								<td>
									{response.player_perspectives}
								</td>
							</tr>
							<tr>
								<td>Similar Games</td>
								<td>
									{response.similar_games.join(', ')}
								</td>
							</tr>
							<tr>
								<td>Themes</td>
								<td>
									{response.themes.join(', ')}
								</td>
							</tr>
						</tbody>
					</table>
				</div> */}

			{/* </div> */}
		</div>

	)
}

export { GameDtl }