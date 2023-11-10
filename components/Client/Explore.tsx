import React, { useState, createContext } from 'react'
import { Explore } from '../../../backendga/helpers/betypes'
import { FilterParent } from '@/app/filtercontext'
import { Search } from './Search'
import { Filter } from './Filter'
import './IndGameList.css'

const Explore = () => {
	return (
		<>
			<Search />
			<FilterParent>
				<div className='explore-wrap'>
					<Filter />
					<IndGameList />
				</div>
			</FilterParent>
		</>
	)
}

export { Explore }