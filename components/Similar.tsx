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

const Similar = () => {
	// const [gameId, setGameId] = useState(() => {
	// 	const gameId = localStorage.getItem('gameid')
	// 	const initialVal = JSON.parse(gameId!)
	// 	return initialVal || null
	// })
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	const [gameId, setGameId] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('gameID') || null
		}
	})
	const [dataFetch, setDataFetch] = useState<SimilarObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/similargames',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': gameId
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
	}, [gameId])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

	return (
		<div>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={dataFetch.title} loading={loading} error={error} />
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
						<Description title={dataFetch.title} involved_companies={dataFetch.involved_companies} summary={dataFetch.summary} story={dataFetch.story} releaseDate={dataFetch.releaseDate} loading={loading} error={error} />
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Similar }