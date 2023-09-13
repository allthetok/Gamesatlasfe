import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { NavButtonList } from './NavButtonList'
import { GameDetailObj } from '../helpers/types'
import './GameDtl.css'

type NavGameProps = {
	response: GameDetailObj
}


const NavGame = ({ response }: NavGameProps) => {
	const [tabSelect, setTabSelect] = useState('overview')

	const handleActiveChange = (tabSelected: string) => {
		setTabSelect(tabSelected)
	}

	return (
		<>
			<div className='title'>
				<div className='mb'>
					<h1>
						{response.title}
					</h1>
				</div>
				<div className='flex flex-end'>
					<div className='titleactions'>
						<div className='collection'>
							<div>
								<b>Add To</b>
								<br/>
								<a className='addto' href=''>
									<p className='smfontp'>My List</p>
									<IconButton sx={{ color: '#ddd' }}>
										<AddBoxIcon/>
									</IconButton>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<NavButtonList tabSelect={tabSelect} handleActiveChange={handleActiveChange}/>
		</>
	)
}

export { NavGame }