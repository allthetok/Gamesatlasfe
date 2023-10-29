/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createAuxiliaryConfig, createDeprecatedNestedConfig, retrieveLocalStorageObj, splitRouteQuery } from '../../helpers/fctns'
import { Explore } from '../../../backendga/helpers/betypes'
import { GameContextObj, LocalStorageObj } from '../../helpers/fetypes'
import { useGameContext } from '@/app/gamecontext'
import { Loading } from './Loading'
import { IndGame } from './IndGame'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import './IndGameList.css'
import './GameDtl.css'
import './Similar.css'

const Similar = () => {
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [dataFetch, setDataFetch] = useState<Explore[]>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>(retrieveLocalStorageObj(false))

	const gameID = parseInt(splitRouteQuery(useRouter().asPath, '?').replace('id=',''))

	const searchConfig = createDeprecatedNestedConfig('post', 'similargames', gameID)

	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data.similar_games)
				console.log(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)

			})
	}, [gameID])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

	return (
		<div>
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} gameID={gameID}/>
						<div>
							<div className='similar-grid-wrapper'>
								{dataFetch.map((item: Explore) => (
									<IndGame key={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} />
								))}
							</div>
							{/* <ul className='similar-ul'>
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
							</ul> */}
						</div>
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
				:
				<Loading auxiliaryObj={auxiliaryObj}/>
			}
		</div>
	)
}

export { Similar }