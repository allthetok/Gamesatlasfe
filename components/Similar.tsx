/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { GameDetailObj } from '../helpers/types'
import { Covers } from '../../backendga/helpers/requests'
import './GameDtl.css'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { GameContext } from '@/app/gamecontext'
import { Search } from './Search'

const Similar = () => {
	const response: GameDetailObj = useContext(GameContext)

	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame/>
				<div>
					<ul className='similar-ul'>
						{response.similar_games.map((el: Covers) => (
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
	)
}

export { Similar }