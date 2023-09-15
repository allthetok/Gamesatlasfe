/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useContext } from 'react'
import { Overview } from './Overview'
import { AgeRatings, Categories, Companies, Platforms, Videos, Languages } from '../../backendga/helpers/requests'
import { response } from '../mockdata/response'
import { ESRB, PEGI, ExternalCategories, WebsiteCategories } from '../assets/ratingsvglinks'
import { ratingFloatToStar, formattedDateLong } from '../helpers/fctns'
import './GameDtl.css'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { GameContext } from '@/app/gamecontext'
import { GameDetailObj } from '../helpers/types'
import { Search } from './Search'

const GameDtl = () => {
	const response: GameDetailObj = useContext(GameContext)

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
							<a href={el.url} target='_blank' rel='noreferrer'>Visit
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

	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame />
				<Overview getPlatformCompanies={getPlatformCompanies} getAgeRatings={getAgeRatings} getStringArr={getStringArr} getWebsites={getWebsites}/>
				<Description />
			</div>
		</div>
	)
}

export default GameDtl