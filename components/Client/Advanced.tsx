import React from 'react'
import { AdvFilterParent } from '@/app/advfiltercontext'
import { FilterParent } from '@/app/filtercontext'
import { Search } from './Search'
import { Filter } from './Filter'
import { AdvFilter } from './AdvFilter'
import './Advanced.css'

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
						</div>
					</div>
				</FilterParent>
			</AdvFilterParent>
		</>
	)
}

export { Advanced }