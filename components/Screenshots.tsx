/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useContext } from 'react'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { NavGame } from './NavGame'
import './Artworks.css'
import './GameDtl.css'
import { Description } from './Description'
import { GameDetailObj, GameContextObj } from '../helpers/types'
import { ContextDtl, useGameContext } from '@/app/gamecontext'
import { Search } from './Search'

const Screenshots = () => {
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
							{dataFetch!.screenshots.map((el: string) => (
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


