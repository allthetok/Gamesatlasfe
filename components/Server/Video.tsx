/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
// import Youtube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube'
// import Carousel from 'react-material-ui-carousel'
import React, { useEffect } from 'react'
import Youtube, { YouTubeProps, YouTubeEvent } from 'react-youtube'
import '../Client/Artworks.css'

type VideoProps = {
	videoId: string,
	name: string
}

const Video = ({ videoId, name }: VideoProps) => {
	const opts: YouTubeProps['opts'] = {
		height: '700',
		width: '1200'
	}

	let videoElement: YouTubeEvent

	const _onReady = (event: YouTubeEvent) => {
		videoElement = event
	}

	return (
		<div className='video'>
			<h2 className='h2-game'>{name}</h2>
			<Youtube videoId={videoId} opts={opts} onReady={_onReady} />
		</div>

	)
}

export { Video }