/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { createAuxiliaryConfig } from '../../../../helpers/fctns'
import { GetServerSidePropsContext } from 'next/types'
import { SimilarGamesObj, GlobalAuxiliaryObj } from '../../../../../backendga/helpers/betypes'
import { NestedSearchConfig } from '../../../../helpers/fetypes'
import Similar from '../../../../components/Server/Similar'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const SimilarGame = (props: { dataFetch: SimilarGamesObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<main className={inter.className}>
			<Similar dataFetch={props.dataFetch} gameID={props.gameID} />
		</main>
	)
}

const getSimilarDtl = async (searchConfig: NestedSearchConfig) => {
	const resultSimilarObj: SimilarGamesObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultSimilarObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const similarSearchConfig = createAuxiliaryConfig('post', 'similargames', context.params!.gameid!)
	return {
		props: {
			dataFetch: await getSimilarDtl(similarSearchConfig),
			gameID: similarSearchConfig.data.gameid
		}
	}
}

export default SimilarGame