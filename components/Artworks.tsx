/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useContext } from 'react'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { NavGame } from './NavGame'
import { GameContextObj, GameDetailObj } from '../helpers/types'
import './Artworks.css'
import './GameDtl.css'
import { Description } from './Description'
import { useGameContext } from '@/app/gamecontext'
import { Search } from './Search'


// type ArtworksProps = {
// 	response: GameDetailObj
// }

// const Artworks = ({ response }: ArtworksProps) => {
const Artworks = () => {
	const { dataFetch, error, loading }: GameContextObj = useGameContext()
	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame/>
				<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
					{dataFetch?.artworks.map((el: string) => (
						<img className='image-carousel' src={el} alt='Artwork' />
					))}
				</Carousel>
				<Description/>
			</div>
		</div>
	)
}

export { Artworks }