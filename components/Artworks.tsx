/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from 'react'
import Carousel from 'react-material-ui-carousel'
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
				<Carousel>
					{response.artworks.map((el: string) => (
						<img src={el} alt='Artwork' />
					))}
				</Carousel>
				:
				<Carousel>
					{response.screenshots.map((el: string) => (
						<img src={el} alt='Artwork' />
					))}
				</Carousel>
			}
		</div>
	)
}

export { Artworks }