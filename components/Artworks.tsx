/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { Description } from './Description'
import { Search } from './Search'
import { NavGame } from './NavGame'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ArtworkObj, GameContextObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './Artworks.css'
import './GameDtl.css'
import axios from 'axios'



// type ArtworksProps = {
// 	response: GameDetailObj
// }

// const Artworks = ({ response }: ArtworksProps) => {
const Artworks = () => {
	const [gameId, setGameId] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('gameID') || null
		}
	})
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [dataFetch, setDataFetch] = useState<ArtworkObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/artwork',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': gameId
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
	}, [gameId])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])
	return (
		<div>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={dataFetch.title} loading={loading} error={error} />
						<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
							{dataFetch?.artworks.map((el: string) => (
								<img className='image-carousel' src={el} alt='Artwork' />
							))}
						</Carousel>
						<Description title={dataFetch.title} involved_companies={dataFetch.involved_companies} summary={dataFetch.summary} story={dataFetch.story} releaseDate={dataFetch.releaseDate} loading={loading} error={error} />
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Artworks }