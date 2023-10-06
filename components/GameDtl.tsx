/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Description } from './Description'
import { Search } from './Search'
import { NavGame } from './NavGame'
import { Overview } from './Overview'
import { AgeRatings, Categories, Companies, Platforms } from '../../backendga/helpers/requests'
import { useGameContext } from '@/app/gamecontext'
import { GameContextObj, LocalStorageObj, OverviewObj } from '../helpers/types'
import { ESRB, PEGI, ExternalCategories, WebsiteCategories } from '../assets/ratingsvglinks'
import './GameDtl.css'
import axios from 'axios'
import ReactLoading from 'react-loading'


const GameDtl = () => {
	// const response: GameDetailObj = useContext(GameContext)
	//const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [searchTerm, setSearchTerm] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('searchterm') || null
		}
	})
	const [dataFetch, setDataFetch] = useState<OverviewObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>({
		gameID: 0,
		title: '',
		involved_companies: '',
		summary: '',
		story: '',
		releaseDate: ''
	})

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/overview',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'searchterm': searchTerm
		}
	}
	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data)
				localStorage.removeItem('auxiliaryObj')
				localStorage.removeItem('gameID')
				const dataFetchAuxiliary: LocalStorageObj = {
					gameID: response.data.id!.toString(),
					title: response.data.title,
					involved_companies: response.data.involved_companies.map((company: Companies) => company.name).join(', '),
					summary: response.data.summary,
					story: response.data.story,
					releaseDate: response.data.releaseDate
				}
				setAuxiliaryObj(dataFetchAuxiliary)
				localStorage.setItem('auxiliaryObj', JSON.stringify(dataFetchAuxiliary))
				// localStorage.setItem('gameID', response.data.id!.toString())
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)

			})
	}, [searchTerm])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

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
			{loading ?
				<ReactLoading
					type={'spinningBubbles'}
					color={'#ddd'}
					height={100}
					width={100}
				/>
				:
				<></>
			}
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						{/* <NavGame title={dataFetch.title} /> */}
						<NavGame title={auxiliaryObj.title} />
						<Overview dataFetch={dataFetch} loading={loading} error={error} getPlatformCompanies={getPlatformCompanies} getAgeRatings={getAgeRatings} getStringArr={getStringArr} getWebsites={getWebsites}/>
						{/* <Description title={dataFetch.title} involved_companies={dataFetch.involved_companies.map((company: Companies) => company.name).join(', ')} summary={dataFetch.summary} story={dataFetch.story} releaseDate={dataFetch.releaseDate} /> */}
						<Description auxiliaryObj={auxiliaryObj} />

					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export default GameDtl