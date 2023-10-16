import React from 'react'
import { IndGame } from './IndGame'
import { multiResponse } from '../mockdata/multi'
import './IndGameList.css'

const IndGameList = () => {
	return (
		<div className='grid-wrapper'>
			{multiResponse.map((item: any) => (
				<IndGame key={item.id} cover={item.cover} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes} title={item.title} />
			))}
		</div>
	)
}

export { IndGameList }