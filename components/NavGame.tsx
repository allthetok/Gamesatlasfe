import React from 'react'
import { NavButtonList } from './NavButtonList'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { GameContextObj, OverviewObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './GameDtl.css'

type NavGameProps = {
	title: string
}

const NavGame = ({ title }: NavGameProps) => {
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

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
					<NavButtonList />
				</div>
				: <></>}
		</>

	)
}

export { NavGame }