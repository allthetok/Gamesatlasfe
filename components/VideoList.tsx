/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useContext, useState } from 'react'
import Youtube, { YouTubeProps } from 'react-youtube'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './Artworks.css'
import { Videos } from '../../backendga/helpers/requests'
import { Video } from './Video'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { GameDetailObj, GameContextObj } from '../helpers/types'
import { ContextDtl, useGameContext } from '@/app/gamecontext'

const VideoList = () => {

	// const opts: YouTubeProps['opts'] = {
	// 	height: '700',
	// 	width: '1200'
	// }
	const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [videoPlaying, setVideoPlaying] = useState('')

	const changeActiveVideo = (videoId: string): void => {
		setVideoPlaying(videoId)
	}

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
						<NavGame />
						<Carousel autoPlay={false}>
							{dataFetch!.videos.map((el: Videos) => (
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
						<Description />
					</div>
				</div>
				: <></>
			}
		</div>
	)
	{/* <h2>{response.videos[0].name}</h2>
			<iframe src={response.videos[0].ytlink} width='560' height='315' frameBorder={0} allowFullScreen={true}></iframe> */}
	{/* <h2>{response.videos[0].name}</h2>
			<Youtube videoId={response.videos[0].ytlink} opts={opts}/> */}
}

export { VideoList }