/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, Suspense } from 'react'
import { IconButton, Rating, Box } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import StarIcon from '@mui/icons-material/Star'
import { GameDetailObj, AgeRatings, Categories, Companies, Platforms, Videos, Languages } from '../../backendga/helpers/requests'
import { response } from '../mockdata/response'
import { ESRB, PEGI, ExternalCategories, WebsiteCategories } from '../assets/ratingsvglinks'
import './GameDtl.css'

const GameDtl = () => {

	const getPlatformCompanies = (platformsArr: Platforms[] | Companies[]): React.JSX.Element => {
		return (
			<>
				{platformsArr.map((val: Platforms | Companies) => (
					<div className='platforms' key={val.name}>
						<img className='logo' alt='Logo of Company' src={val.url} />
						<p className='ptext'>{val.name}</p>
					</div>
				))}
			</>
		)
	}

	const getAgeRatings = (ratingsObj: AgeRatings): React.JSX.Element => {
		return (
			<>
				<div className='platforms'>
					<img className='logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === ratingsObj.ESRB)[0].src} />
					<p className='ptext'>ESRB Rating</p>
				</div>
				<div className='platforms'>
					<img className='logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === ratingsObj.PEGI)[0].src} />
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

	const getWebsites = (categoriesArr: Categories[], specified: string): React.JSX.Element => {
		return specified === 'External' ?
			(
				<>
					{categoriesArr.map((el: Categories) => (
						<div key={el.category}>
							<p className='max-rating smallmargin'>
								{ExternalCategories.filter((field) => field.source === el.category)[0].category}
								<img className='logo pad-left' alt={`${ExternalCategories.filter((field) => field.source === el.category)[0].category}`} src={`${ExternalCategories.filter((field) => field.source === el.category)[0].src}`} />
							</p>
							<a href={el.url} target='_blank' rel='noreferrer'>Visit{/* </a> <a href={el.url} className='link-external'> */}
								<img className='link-external' alt='Open Website' src='https://www.mobygames.com/static/img/icon-link-external.c0245369.svg'/>
							</a>
						</div>
					))}
				</>
			) :
			(
				<>
					{categoriesArr.map((el: Categories) => (
						<div key={el.category}>
							<p className='max-rating smallmargin'>
								{WebsiteCategories.filter((field) => field.source === el.category)[0].category}
								<img className='logo pad-left' alt={`${WebsiteCategories.filter((field) => field.source === el.category)[0].category}`} src={`${WebsiteCategories.filter((field) => field.source === el.category)[0].src}`} />
							</p>
							<a href={el.url} target='_blank' rel='noreferrer'>Visit{/* </a> <a href={el.url} className='link-external'> */}
								<img className='link-external' alt='Open Website' src='https://www.mobygames.com/static/img/icon-link-external.c0245369.svg'/>
							</a>
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
									<p className='smfontp'>My List</p>
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
		</div>

	)
}

export default GameDtl