/* eslint-disable react/jsx-key */
import React from 'react'
import { homeData } from '../../mockdata/homedata'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { IndGame } from './IndGame'
import './Artworks.css'
import './GameDtl.css'
import './IndGameList.css'
import './Home.css'

const HomeCarousel = () => {

	const createObjArray = (homeData: any[]) => {
		const homeDataArray: any[] = []
		for (let i = 0; i < homeData.length; i = i + 3) {
			homeDataArray.push(homeData.slice(i, i + 3))
		}
		return homeDataArray
	}


	return (
		<div className='home-wrapper'>
			<div className='home-carousel-wrapper'>
				<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={5000} animation={'fade'} sx={{ maxWidth: '1500px', display: 'flex', flexDirection: 'column', height: '100%' }}>
					{createObjArray(homeData).map((el: any) => (
						<div className='home-grid-wrapper'>
							{el.map((item: any) => (
								<IndGame key={item.id} id={item.id} cover={item.cover} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes} title={item.title} genres={item.genres} companies={item.involved_companies} liked={false}  />
							))}
						</div>
					))}
				</Carousel>
			</div>
		</div>
	)
}

export { HomeCarousel }