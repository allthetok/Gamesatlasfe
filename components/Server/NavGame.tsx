import React from 'react'
import { NavButtonList } from './NavButtonList'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import './GameDtl.css'

type NavGameProps = {
	title: string,
	gameID: number,
	searchterm: string
}

const NavGame = ({ title, gameID, searchterm }: NavGameProps) => {
	return (
		<>
			{title ?
				<div>
					<div className='title'>
						<div className='mb'>
							<h1>
								{title}
							</h1>
						</div>
						<div className='flex flex-end'>
							<div className='titleactions'>
								<div className='collection'>
									<div>
										<b>Add To</b>
										<br />
										<a className='addto' href=''>
											<p className='smfontp'>My List</p>
											<IconButton sx={{ color: '#ddd' }}>
												<AddBoxIcon />
											</IconButton>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<NavButtonList gameID={gameID} searchterm={searchterm} />
				</div>
				: <></>}
		</>

	)
}

export { NavGame }