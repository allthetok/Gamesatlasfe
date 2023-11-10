import React from 'react'
import { FilterParent } from '@/app/filtercontext'
import { Search } from './Search'
import { Filter } from './Filter'
import { IndGameList } from './IndGameList'
import './IndGameList.css'

const ExplorePage = () => {
	return (
		<>
			<Search />
			<FilterParent>
				<div className='explore-wrap'>
					<div>
						<Filter />
						<IndGameList />
					</div>
				</div>
			</FilterParent>
		</>
	)
}

export { ExplorePage }