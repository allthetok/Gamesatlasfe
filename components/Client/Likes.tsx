/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react'
import { useLikes } from '../../hooks/useLikes'
import ReactLoading from 'react-loading'
import { IndGame } from './IndGame'
import { Button, SvgIcon } from '@mui/material'
import { ListTblToggleSx, IconSx } from '../../sxstyling/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { IndGameTable } from './IndGameTable'
import './Recommend.css'
import './IndGameList.css'
import { Session } from 'next-auth'

type LikesProps = {
	user: Session['user'] | undefined
}
// const user: InternalUser  OAuthUser | DefaultSession['user'] = session?.user
// const user: (InternalUser & DefaultSession['user']) | (OAuthUser & DefaultSession['user']) = session?.user
// console.log(session)
// const user = session?.user
// console.log(user)
// console.log(user?.id)
const Likes = ({ user }: LikesProps) => {
	const [viewToggle, setViewToggle] = useState('list')
	// const data = useSession()
	// const { likeDataFetch, error, loading } = useLikes(data.data?.user.id)
	// console.log(likeDataFetch)
	// console.log(likeDataFetch.map((item: any) => item.gameobj).map((gme: any) => gme.involved_companies))
	const { likeDataFetch, loading } = useLikes(user?.id)
	// console.log(likeDataFetch)
	// console.log(likeDataFetch.map((item: any) => item.gameobj).map((gme: any) => gme.involved_companies))

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