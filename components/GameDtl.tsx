/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, Suspense } from 'react'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { NavButtonList } from './NavButtonList'
import { Overview } from './Overview'
import { Artworks } from './Artworks'
import { VideoList } from './VideoList'
import { Language } from './Language'
import { GameDetailObj, AgeRatings, Categories, Companies, Platforms, Videos, Languages } from '../../backendga/helpers/requests'
import { response } from '../mockdata/response'
import { ESRB, PEGI, ExternalCategories, WebsiteCategories } from '../assets/ratingsvglinks'
import './GameDtl.css'

const GameDtl = () => {
	const [tabSelect, setTabSelect] = useState('overview')

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

	const handleActiveChange = (tabSelected: string) => {
		setTabSelect(tabSelected)
	}


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
			<NavButtonList tabSelect={tabSelect} handleActiveChange={handleActiveChange}/>
			{
				tabSelect === 'overview' ?
					<Overview response={response} formattedDateLong={formattedDateLong} getPlatformCompanies={getPlatformCompanies} getAgeRatings={getAgeRatings} getStringArr={getStringArr} getWebsites={getWebsites} ratingFloatToStar={ratingFloatToStar} />
					: <></>
			}
			{
				tabSelect === 'artworks' ?
					<Artworks response={response} tabSelected='artworks'/>
					: <></>
			}
			{
				tabSelect === 'screenshots' ?
					<Artworks response={response} tabSelected='screenshots'/>
					: <></>
			}
			{
				tabSelect === 'videos' ?
					<VideoList response={response} />
					: <></>
			}
			{
				tabSelect === 'languages' ?
					<Language response={response} />
					: <></>
			}
			<div>
				<h2>Official Description</h2>
				<div className='shrink-headings toggle-long-text line-clamp'>
					<p className='text-desc'>
						{response.summary}
					</p>
					<p className='text-desc'>
						In&nbsp;
						<strong>
							<em>{response.title}</em>
						</strong>
						,&nbsp;{response.story.charAt(0).toLowerCase() + response.story.slice(1)}
					</p>
					<p className='text-desc'>
						Released by {response.involved_companies.map(company => company.name).join(', ')} on {formattedDateLong(response.releaseDate)}.
					</p>
				</div>
			</div>
		</div>

	)
}

export default GameDtl