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

const HomeCarousel = () => {
	const homeDataSliced = homeData.slice(0, 2)
	const homeDataSliced2 = homeData.slice(3, 5)

	const createObjArray = (homeData: any[]) => {
		const homeDataArray: any[] = []
		for (let i = 0; i < homeData.length; i = i + 4) {
			homeDataArray.push(homeData.slice(i, i + 4))
		}
		return homeDataArray
	}

	console.log(createObjArray(homeData))



	return (
		<div className='home-wrapper'>
			<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
				{createObjArray(homeData).map((el: any) => (
					<div className='grid-wrapper'>
						{el.map((item: any) => (
							<IndGame key={item.id} id={item.id} cover={item.cover} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes} title={item.title} genres={item.genres} companies={item.involved_companies} liked={false}  />
						))}
					</div>
				))}
			</Carousel>
		</div>
	)
}

export { HomeCarousel }