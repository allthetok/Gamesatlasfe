/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { NavGame } from './NavGame'
import { GameDetailObj } from '../helpers/types'
import './Artworks.css'
import './GameDtl.css'
import { Description } from './Description'



type ScreenshotsProps = {
	response: GameDetailObj
}

const Screenshots = ({ response }: ScreenshotsProps) => {
	return (
		<div className='header-wrapper'>
			<NavGame response={response}/>
			<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
				{response.screenshots.map((el: string) => (
					<img className='image-carousel' src={el} alt='In-Game Screenshot' />
				))}
			</Carousel>
			<Description response={response} />
		</div>
	)
}

export { Screenshots }


