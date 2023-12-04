import React from 'react'
import { homeData } from '../../mockdata/homedata'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { IndGame } from './IndGame'
import './Artworks.css'
import './GameDtl.css'
import './IndGameList.css'

const HomeCarousel = () => {
	const homeDataSliced = homeData.slice(0, 7)


	return (
		<div className='home-wrapper'>
			<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
				<div className='grid-wrapper'>
					{homeDataSliced.map((el: any) => (
						<IndGame key={el.index} id={el.id} cover={el.cover} platforms={el.platforms} rating={el.rating} age_ratings={el.age_ratings} releaseDate={el.releaseDate} likes={el.likes} title={el.title} genres={el.genres} companies={el.involved_companies} liked={false}  />
					))}
				</div>
			</Carousel>
		</div>
	)
}

export { HomeCarousel }