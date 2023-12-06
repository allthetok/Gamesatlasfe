/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react'
import { useLikes } from '../../hooks/useLikes'
import ReactLoading from 'react-loading'
import { Session } from 'next-auth'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import { Button, SvgIcon } from '@mui/material'
import { ListTblToggleSx, IconSx } from '../../sxstyling/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import './Recommend.css'
import './IndGameList.css'

type LikesProps = {
	user: Session['user'] | undefined
}

const Likes = ({ user }: LikesProps) => {
	const [viewToggle, setViewToggle] = useState('list')
	const { likeDataFetch, loading } = useLikes(user?.id)

	return (
		<div>
			<div className='filter-recommend-wrap'>
				<div className='button-wrap'>
					<Button sx={ListTblToggleSx(viewToggle, 'listbtn')} onClick={() => setViewToggle('list')} variant={viewToggle === 'list' ? 'contained' : 'outlined'}>
						<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
							<GridViewIcon />
						</SvgIcon>
					</Button>
					<Button sx={ListTblToggleSx(viewToggle, 'tblbtn')} onClick={() => setViewToggle('table')} variant={viewToggle === 'table' ? 'contained' : 'outlined'}>
						<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
							<TableRowsIcon />
						</SvgIcon>
					</Button>
				</div>
			</div>
			<div className='explore-wrap'>
				<h3 className='title-recommend'>
				All Games You&apos;ve Liked: {user?.username}
				</h3>
				{!loading ?
					<>
						{likeDataFetch.length !== 0
							? <>
								{viewToggle === 'list' ?
									<div className='grid-wrapper'>
										{likeDataFetch.map((item: any) => (
											<IndGame key={item.likeid} id={item.gameobj.id} cover={item.gameobj.cover!} platforms={item.gameobj.platforms} rating={item.gameobj.rating} age_ratings={item.gameobj.age_ratings} releaseDate={item.gameobj.releaseDate} likes={item.gameobj.likes!} title={item.gameobj.title} genres={item.gameobj.genres} companies={item.gameobj.involved_companies} liked={true}/>
										))}
									</div>
									: <IndGameTable multiResp={likeDataFetch.map((item: any) => item.gameobj)} />
								}
							</>
							:
							<div className='header-title-error'>
								<h2>
									You haven&apos;t liked any games!
								</h2>
							</div>
						}
					</>
					:
					<div className='load-wrapper'>
						<ReactLoading
							type={'spinningBubbles'}
							color={'#ddd'}
							height={200}
							width={200}
						/>
					</div>
				}
			</div>
		</div>

	)
}

export { Likes }