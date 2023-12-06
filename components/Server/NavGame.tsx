/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLikes } from '../../hooks/useLikes'
import { likeGame, deleteGame } from '../../helpers/fctns'
import { NavButtonList } from './NavButtonList'
import { IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TableCellColourSx } from '../../sxstyling/styles'
import './GameDtl.css'

type NavGameProps = {
	title: string,
	gameID: number,
	searchterm: string
}

const NavGame = ({ title, gameID, searchterm }: NavGameProps) => {
	const data = useSession()
	const router = useRouter()
	const [userId, setUserId] = useState<string|null>(null)
	const { likeDataFetch, loading } = useLikes(data.data?.user.id)
	const [gameLiked, setGameLiked] = useState(false)

	useEffect(() => {
		if (data.status === 'authenticated') {
			setUserId(data.data.user.id)
			setUserId(data.data.user.id)
			setGameLiked(likeDataFetch.map((item: any) => item.gameobj.id).includes(gameID))
		}
	}, [data, loading])

	const handleLikeClick = async () => {
		if (userId === null) {
			router.push('/signin')
		}
		else {
			const returnResult = await likeGame(userId!, String(gameID), null, null)
			setGameLiked(returnResult.status === 'like')
		}
	}

	const handleDeleteClick = async () => {
		if (userId === null) {
			router.push('/signin')
		}
		else {
			const returnResult = await deleteGame(userId!, String(gameID))
			setGameLiked(returnResult.status !== 'deleted')
		}
	}

	return (
		<>
			{title ?
				<div>
					<div className='title'>
						<div className='mb'>
							<h1 className='h1-nav-title'>
								{title}
							</h1>
						</div>
						<div className='flex flex-end'>
							<div className='titleactions'>
								<div className='collection'>
									{!gameLiked ?
										<div>
											<b>Add To</b>
											<br />
											<a className='addto'>
												<p className='smfontp'>My List</p>
												<IconButton sx={TableCellColourSx} onClick={handleLikeClick}>
													<AddBoxIcon />
												</IconButton>
											</a>
										</div>
										:
										<div>
											<b>Delete From</b>
											<br />
											<a className='addto'>
												<p className='smfontp'>My List</p>
												<IconButton sx={TableCellColourSx} onClick={handleDeleteClick}>
													<HighlightOffIcon />
												</IconButton>
											</a>
										</div>
									}
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