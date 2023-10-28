/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery } from '../helpers/fctns'
import { GameContextObj, LocalStorageObj, ScreenshotsObj } from '../helpers/fetypes'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useGameContext } from '@/app/gamecontext'
import { Loading } from './Loading'
import { Search } from './Search'
import { NavGame } from './NavGame'
import { Description } from './Description'
import './Artworks.css'
import './GameDtl.css'


const Screenshots = () => {
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	const [dataFetch, setDataFetch] = useState<ScreenshotsObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>(retrieveLocalStorageObj(false))

	const [gameID, setGameID] = useState<number>(parseInt(splitRouteQuery(useRouter().asPath, '?').replace('id=','')))



	// const searchConfig = createAuxiliaryConfig('post', 'screenshots', auxiliaryObj.gameID)
	// const getGameDtl = useCallback(async () => {
	// 	await axios(searchConfig)
	// 		.then((response) => {
	// 			setDataFetch(response.data)
	// 			setLoading(false)
	// 		})
	// 		.catch((err) => {
	// 			setError(err)
	// 			console.error(err)

	// 		})
	// }, [auxiliaryObj.gameID])

	// useEffect(() => {
	// 	getGameDtl()
	// }, [getGameDtl])
	const searchConfig = createAuxiliaryConfig('post', 'screenshots', gameID)
	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)

			})
	}, [gameID])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])
	return (
		<div>
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} gameID={gameID} />
						<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
							{dataFetch?.screenshots.map((el: string) => (
								<img key={el} className='image-carousel' src={el} alt='In-Game Screenshot' />
							))}
						</Carousel>
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
				:
				<Loading auxiliaryObj={auxiliaryObj}/>
			}
		</div>
	)
}

export { Screenshots }


