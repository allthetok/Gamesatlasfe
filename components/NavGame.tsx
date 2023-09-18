import React from 'react'
import { NavButtonList } from './NavButtonList'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { GameContextObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './GameDtl.css'


const NavGame = () => {
	const { dataFetch, error, loading }: GameContextObj = useGameContext()

	return (
		<>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error && dataFetch ?
				<>
					<div className='title'>
						<div className='mb'>
							<h1>
								{dataFetch?.title}
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
				</>
				: <></>
			}
		</>
	)
}

export { NavGame }