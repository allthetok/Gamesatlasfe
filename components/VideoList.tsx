/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
// import Youtube, { YouTubeProps } from 'react-youtube'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import React, { useCallback, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Video } from './Video'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { Videos } from '../../backendga/helpers/requests'
import { GameContextObj, VideoObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './Artworks.css'
import axios from 'axios'
import { Loading } from './Loading'



const VideoList = () => {

	// const opts: YouTubeProps['opts'] = {
	// 	height: '700',
	// 	width: '1200'
	// }
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [videoPlaying, setVideoPlaying] = useState('')

	const changeActiveVideo = (videoId: string): void => {
		setVideoPlaying(videoId)
	}

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

	const [dataFetch, setDataFetch] = useState<VideoObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/videos',
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
						<Carousel autoPlay={false}>
							{dataFetch?.videos.map((el: Videos) => (
								// <>
								// 	<h2>{el.name}</h2>
								// 	<iframe src={el.ytlink} width='1373.88' height='730' allowFullScreen={true}></iframe>
								// </>
								// <div>
								// 	<h2>{el.name}</h2>
								// 	<Youtube videoId={el.ytlink} opts={opts}/>
								// </div>
								<Video videoId={el.ytlink} name={el.name} videoPlaying={videoPlaying} changeActiveVideo={changeActiveVideo} />
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
	{/* <h2>{response.videos[0].name}</h2>
			<iframe src={response.videos[0].ytlink} width='560' height='315' frameBorder={0} allowFullScreen={true}></iframe> */}
	{/* <h2>{response.videos[0].name}</h2>
			<Youtube videoId={response.videos[0].ytlink} opts={opts}/> */}
}

export { VideoList }