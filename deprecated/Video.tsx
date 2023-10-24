/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import Youtube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube'
import Carousel from 'react-material-ui-carousel'
import { GameDetailObj } from '../helpers/fetypes'
import './Artworks.css'

type VideoProps = {
	videoId: string,
	name: string,
	videoPlaying: string,
	changeActiveVideo: (video: string) => void
}

const Video = ({ videoId, name, videoPlaying, changeActiveVideo }: VideoProps) => {
	const opts: YouTubeProps['opts'] = {
		height: '700',
		width: '1200'
	}

	let videoElement: YouTubeEvent

	const _onReady = (event: YouTubeEvent) => {
		videoElement = event
	}

	// // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
	// // 	// access to player in all event handlers via event.target
	// // 	console.log(event.target)
	// // 	event.target.pauseVideo()
	// // }
	const pauseOtherVideos: YouTubeProps['onPlay'] = (event) => {
		changeActiveVideo(videoId)
		console.log(event.target.getPlayerState())
		console.log(event.target.getVideoUrl())
	}

	const pauseOtherVids = (videoElement: YouTubeEvent) => {
		console.log(videoElement)
		if (videoElement) {
			videoElement.target.pauseVideo()
		}
	}



	useEffect(() => {
		if (videoId !== videoPlaying) {
			console.log('pause this video')
			pauseOtherVids(videoElement)
		}
	}, [videoPlaying])


	return (
		<div className='video'>
			<h2>{name}</h2>
			<Youtube videoId={videoId} opts={opts} onPlay={pauseOtherVideos} onReady={_onReady} />
		</div>

	)
}

export { Video }