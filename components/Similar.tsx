/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { Covers } from '../../backendga/helpers/requests'
import { GameContextObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './GameDtl.css'

const Similar = () => {
	const { dataFetch, error, loading }: GameContextObj = useGameContext()

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
						<NavGame/>
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
						<Description/>
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Similar }