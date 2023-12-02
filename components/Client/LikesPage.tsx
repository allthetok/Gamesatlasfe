import React from 'react'
import { Search } from './Search'
import { Likes } from './Likes'
import './Advanced.css'
import './IndGameList.css'

const LikesPage = () => {

	return (
		<>
			<Search/>
			<div className='explore-wrap'>
				<div>
					<Likes />
				</div>
			</div>

		</>
	)
}

export { LikesPage }