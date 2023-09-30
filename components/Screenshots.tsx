/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { Search } from './Search'
import { NavGame } from './NavGame'
import { Description } from './Description'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { GameContextObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './Artworks.css'
import './GameDtl.css'

const Screenshots = () => {
	const [gameId, setGameId] = useState(() => {
		const gameId = localStorage.getItem('gameid')
		const initialVal = JSON.parse(gameId!)
		return initialVal || null
	})
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
						<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
							{dataFetch?.screenshots.map((el: string) => (
								<img className='image-carousel' src={el} alt='In-Game Screenshot' />
							))}
						</Carousel>
						<Description/>
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Screenshots }


