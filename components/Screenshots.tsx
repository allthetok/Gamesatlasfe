/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { Search } from './Search'
import { NavGame } from './NavGame'
import { Description } from './Description'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { GameContextObj, ScreenshotsObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './Artworks.css'
import './GameDtl.css'
import axios from 'axios'
import { Loading } from './Loading'

const Screenshots = () => {
	// const [gameId, setGameId] = useState(() => {
	// 	const gameId = localStorage.getItem('gameid')
	// 	const initialVal = JSON.parse(gameId!)
	// 	return initialVal || null
	// })
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	const [auxiliaryObj, setAuxiliaryObj]: any = useState(() => {
		if (typeof window !== 'undefined'){
			const localstorageObj =  localStorage.getItem('auxiliaryObj')
			return JSON.parse(localstorageObj!)
		}
	})
	const [dataFetch, setDataFetch] = useState<ScreenshotsObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/screenshots',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': auxiliaryObj.gameID
		}
	}
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
	}, [auxiliaryObj.gameID])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])
	return (
		<div>
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} />
						<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
							{dataFetch?.screenshots.map((el: string) => (
								<img className='image-carousel' src={el} alt='In-Game Screenshot' />
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


