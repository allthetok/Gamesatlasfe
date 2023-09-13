import React from 'react'
import { response } from '../mockdata/response'
import './GameDtl.css'

const Table = () => {
	return (
		<div className='row'>
			<div className='span8'>
				<table className='table table-bordered'>
					<tbody className='tbody'>
						<tr>
							<td className='span3'>Game ID</td>
							<td>{response.id}</td>
						</tr>
						<tr>
							<td>Game Mode</td>
							<td>{response.game_modes}</td>
						</tr>
						<tr>
							<td>Genres</td>
							<td>{response.genres.join(', ')}</td>
						</tr>
						<tr>
							<td>Developers</td>
							<td>{response.involved_companies.map(val => val.name).join(', ')}</td>
						</tr>
						<tr>
							<td>Keywords</td>
							<td>{response.keywords.join(', ')}</td>
						</tr>
						<tr>
							<td>Platforms</td>
							<td className='platforms'>
								{/* {getPlatforms(response.platforms)} */}
							</td>
						</tr>
						<tr>
							<td>Player Perspective</td>
							<td>
								{response.player_perspectives}
							</td>
						</tr>
						<tr>
							<td>Similar Games</td>
							<td>
								{response.similar_games.join(', ')}
							</td>
						</tr>
						<tr>
							<td>Themes</td>
							<td>
								{response.themes.join(', ')}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Table