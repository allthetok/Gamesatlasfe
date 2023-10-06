/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { Description } from './Description'
import { Search } from './Search'
import { NavGame } from './NavGame'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ArtworkObj, GameContextObj, LocalStorageObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './Artworks.css'
import './GameDtl.css'
import axios from 'axios'
import ReactLoading from 'react-loading'



// type ArtworksProps = {
// 	response: GameDetailObj
// }

// const Artworks = ({ response }: ArtworksProps) => {
const Artworks = () => {
	// const [gameId, setGameId] = useState(() => {
	// 	if (typeof window !== 'undefined') {
	// 		return localStorage.getItem('gameID') || null
	// 	}
	// })
	const [auxiliaryObj, setAuxiliaryObj]: any = useState(() => {
		if (typeof window !== 'undefined'){
			const localstorageObj =  localStorage.getItem('auxiliaryObj')
			return JSON.parse(localstorageObj!)
		}
	})
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [dataFetch, setDataFetch] = useState<ArtworkObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/artwork',
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
							{dataFetch?.artworks.map((el: string) => (
								<img className='image-carousel' src={el} alt='Artwork' />
							))}
						</Carousel>
						{/* <Description title={auxiliaryObj.title} involved_companies={auxiliaryObj.involved_companies} summary={auxiliaryObj.summary} story={auxiliaryObj.story} releaseDate={auxiliaryObj.releaseDate} /> */}
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
				:
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} />
						<ReactLoading
							type={'spinningBubbles'}
							color={'#ddd'}
							height={100}
							width={100}
						/>
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
			}
		</div>
	)
}

export { Artworks }