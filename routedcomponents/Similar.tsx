/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { GameDetailObj } from '../helpers/fetypes'
import { Covers } from '../../backendga/helpers/requests'
import './GameDtl.css'

type SimilarProps = {
	response: GameDetailObj
}
const Similar = ({ response }: SimilarProps) => {
	return (
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
	)
}

export { Similar }