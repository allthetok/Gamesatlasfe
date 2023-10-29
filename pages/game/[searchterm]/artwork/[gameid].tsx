/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { createAuxiliaryConfig, searchtermToString } from '../../../../helpers/fctns'
import { GetServerSidePropsContext } from 'next/types'
import { ArtworksObj, GlobalAuxiliaryObj } from '../../../../../backendga/helpers/betypes'
import { NestedSearchConfig } from '../../../../helpers/fetypes'
import Artworks from '../../../../components/Server/Artworks'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const Artwork = (props: { dataFetch: ArtworksObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<main className={inter.className}>
			<Artworks dataFetch={props.dataFetch} gameID={props.gameID}/>
		</main>
	)
}

const getArtworkDtl = async (searchConfig: NestedSearchConfig) => {
	const resultArtObj: ArtworksObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultArtObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const artworkSearchConfig = createAuxiliaryConfig('post', 'artwork', context.params!.gameid!)
	return {
		props: {
			dataFetch: await getArtworkDtl(artworkSearchConfig),
			gameID: artworkSearchConfig.data.gameid
		}
	}
}

export default Artwork