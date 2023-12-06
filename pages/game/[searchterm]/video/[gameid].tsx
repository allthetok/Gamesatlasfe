/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { createAuxiliaryConfig } from '../../../../helpers/fctns'
import { GetServerSidePropsContext } from 'next/types'
import { NestedSearchConfig, VideosObj, GlobalAuxiliaryObj } from '../../../../helpers/fetypes'
import VideoList from '../../../../components/Server/VideoList'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'
import { Footer } from '../../../../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

const Videos = (props: { dataFetch: VideosObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<><main className={inter.className}>
			<VideoList dataFetch={props.dataFetch} gameID={props.gameID} />
		</main><Footer /></>
	)
}

const getVideoDtl = async (searchConfig: NestedSearchConfig) => {
	const resultVideoObj: VideosObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultVideoObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const videoSearchConfig = createAuxiliaryConfig('post', 'videos', context.params!.gameid!)
	return {
		props: {
			dataFetch: await getVideoDtl(videoSearchConfig),
			gameID: videoSearchConfig.data.gameid
		}
	}
}

export default Videos