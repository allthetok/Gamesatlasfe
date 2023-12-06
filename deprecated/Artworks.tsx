/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery , createDeprecatedNestedConfig } from '../helpers/fctns'
import { ArtworkObj, GameContextObj, AuxiliaryObj, LocalStorageObj } from '../helpers/fetypes'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useGameContext } from '@/app/gamecontext'
import { Loading } from '../components/Client/Loading'
import { Description } from '../components/Client/Description'
import { Search } from '../components/Client/Search'
import { NavGame } from './NavGame'
import './Artworks.css'
import './GameDtl.css'


const Artworks = () => {

	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>(retrieveLocalStorageObj(false))

	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [dataFetch, setDataFetch] = useState<ArtworkObj & AuxiliaryObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [navProps, setNavProps] = useState<AuxiliaryObj>()


	const gameID = parseInt(splitRouteQuery(useRouter().asPath, '?').replace('id=',''))

	const searchConfig = createDeprecatedNestedConfig('post', 'artwork', gameID)
	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data)
				setNavProps({
					title: response.data.title,
					involved_companies: response.data.involved_companies,
					summary: response.data.summary,
					story: response.data.story,
					releaseDate: response.data.releaseDate
				})
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
