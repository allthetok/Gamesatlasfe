import React from 'react'
import { IndGame } from './IndGame'
import { multiResponse } from '../mockdata/multi'

const IndGameList = () => {
	return (
		<div>
			<ul>
				{multiResponse.map((item: any) => (
					<li key={item.id}>
						<IndGame cover={item.cover} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes} title={item.title} />
					</li>
				))}
			</ul>
		</div>
	)
}

export { IndGameList }