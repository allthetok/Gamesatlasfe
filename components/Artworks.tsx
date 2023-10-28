/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery } from '../helpers/fctns'
import { ArtworkObj, GameContextObj, LocalStorageObj } from '../helpers/fetypes'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useGameContext } from '@/app/gamecontext'
import axios from 'axios'
import { Loading } from './Loading'
import { Description } from './Description'
import { Search } from './Search'
import { NavGame } from './NavGame'
import './Artworks.css'
import './GameDtl.css'


const Artworks = () => {

	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>(retrieveLocalStorageObj(false))

	const [gameID, setGameID] = useState<number>(parseInt(splitRouteQuery(useRouter().asPath, '?').replace('id=','')))

	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [dataFetch, setDataFetch] = useState<ArtworkObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	console.log(gameID)

	// const searchConfig = createAuxiliaryConfig('post', 'artwork', auxiliaryObj.gameID)
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

	const searchConfig = createAuxiliaryConfig('post', 'artwork', gameID)
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
							{dataFetch?.artworks.map((el: string) => (
								<img key={el} className='image-carousel' src={el} alt='Artwork' />
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

export { Artworks }