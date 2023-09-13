/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { GameDetailObj } from '../helpers/types'
import './Artworks.css'

type ArtworksProps = {
	response: GameDetailObj,
	tabSelected: string
}

const Artworks = ({ response, tabSelected }: ArtworksProps) => {
	return (
		<div>
			{ tabSelected === 'artworks' ?
				<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
					{response.artworks.map((el: string) => (
						<img className='image-carousel' src={el} alt='Artwork' />
					))}
				</Carousel>
				:
				<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
					{response.screenshots.map((el: string) => (
						<img className='image-carousel' src={el} alt='Artwork' />
					))}
				</Carousel>
			}
		</div>
	)
}

export { Artworks }