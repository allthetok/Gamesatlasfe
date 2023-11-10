import React from 'react'
import { AdvFilterParent } from '@/app/advfiltercontext'
import { FilterParent } from '@/app/filtercontext'
import { Search } from './Search'
import { Filter } from './Filter'
import { AdvFilter } from './AdvFilter'
import { IndGameList } from './IndGameList'
import './Advanced.css'
import './IndGameList.css'

const Advanced = () => {

	return (
		<>
			<Search/>
			<AdvFilterParent>
				<AdvFilter />
				<FilterParent>
					<div className='explore-wrap'>
						<div>
							<Filter />
							<IndGameList />
						</div>
					</div>
				</FilterParent>
			</AdvFilterParent>
		</>
	)
}

export { Advanced }