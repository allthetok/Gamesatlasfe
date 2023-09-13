import React, { useContext } from 'react'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { NavButtonList } from './NavButtonList'
import { GameDetailObj } from '../helpers/types'
import './GameDtl.css'
import { GameContext } from '@/app/gamecontext'


const NavGame = () => {
	const response: GameDetailObj = useContext(GameContext)

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
			<NavButtonList/>
		</>
	)
}

export { NavGame }