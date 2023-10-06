/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { Covers } from '../../backendga/helpers/requests'
import { GameContextObj, SimilarObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './GameDtl.css'
import axios from 'axios'
import ReactLoading from 'react-loading'

const Similar = () => {
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	// const [gameId, setGameId] = useState(() => {
	// 	if (typeof window !== 'undefined') {
	// 		return localStorage.getItem('gameID') || null
	// 	}
	// })
	const [auxiliaryObj, setAuxiliaryObj]: any = useState(() => {
		if (typeof window !== 'undefined'){
			const localstorageObj =  localStorage.getItem('auxiliaryObj')
			return JSON.parse(localstorageObj!)
		}
	})
	const [dataFetch, setDataFetch] = useState<SimilarObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/similargames',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': auxiliaryObj.gameID
		}
	}
	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)

			})
	}, [auxiliaryObj.gameID])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

	return (
		<div>
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title}/>
						<div>
							<ul className='similar-ul'>
								{dataFetch.similar_games.map((el: Covers) => (
									<li className='similar-li' key={el.name}>
										<div className='similar'>
											<a className='similar-game-link'>
												{el.name}
											</a>
											<img className='img-box' alt={`Cover Art of ${el.name}`} src={el.cover.toString()} />
										</div>
									</li>
								))}
							</ul>
						</div>
						{/* <Description title={auxiliaryObj.title} involved_companies={auxiliaryObj.involved_companies} summary={auxiliaryObj.summary} story={auxiliaryObj.story} releaseDate={auxiliaryObj.releaseDate} /> */}
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
				:
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} />
						<ReactLoading
							type={'spinningBubbles'}
							color={'#ddd'}
							height={100}
							width={100}
						/>
						{/* <Description title={auxiliaryObj.title} involved_companies={auxiliaryObj.involved_companies} summary={auxiliaryObj.summary} story={auxiliaryObj.story} releaseDate={auxiliaryObj.releaseDate} /> */}
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
			}
		</div>
	)
}

export { Similar }