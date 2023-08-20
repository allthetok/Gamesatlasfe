import React, { useState } from 'react'
import { response } from '../mockdata/response'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import './GameDtl.css'

type Platforms = {
	'name': string,
	'category': number,
	'platform_logo': number,
	'url': string
}

const GameDtl = () => {

	const getPlatforms = (platformsArr: Platforms[]) => {
		return (
			<>
				{platformsArr.map((val: Platforms) => (
					<div className='platforms' key={val.name}>
						<img className='logo' src={val.url} />
						{val.name}
					</div>
				))}
			</>
		)
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
									<div className='smfont'>My List</div>
									<IconButton sx={{ color: '#ddd' }}>
										<AddBoxIcon/>
									</IconButton>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul className='nav-tabs mb'>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Overview</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Artworks</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Screenshots</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Similar Games</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Videos</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Community Websites</a>
				</li>
				<li className='nav-tabs-li'>
					<a className='nav-link'>Language Details</a>
				</li>
			</ul>
			<div id='infoBlock' className='game-info mb'>
				<div className='info-box'>
					<div>
						<img className='img-box' src={response.cover}/>
					</div>
				</div>
				<div className='info-releaservw'>
					<div>
						Release
					</div>
				</div>
			</div>


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
									{getPlatforms(response.platforms)}
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
		</div>

	)
}

export { GameDtl }