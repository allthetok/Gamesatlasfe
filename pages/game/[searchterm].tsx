/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import { GameObj } from '../../../backendga/helpers/betypes'
import { createGameDtlConfig } from '../../helpers/fctns'
import { SimpleSearchConfig } from '../../helpers/fetypes'
import GameDtl from '../../components/Server/GameDtl'
import { Inter } from 'next/font/google'
import '../../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const Game = (props: { dataFetch: GameObj }) => {
	return (
		<main className={inter.className}>
			<GameDtl dataFetch={props.dataFetch} />
		</main>
	)
}

const getGameDtl = async (searchConfig: SimpleSearchConfig) => {
	const resultGameObj: GameObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultGameObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const gameSearchConfig = createGameDtlConfig('post', 'overview', context.params!.searchterm!)
	console.log(gameSearchConfig.data.searchterm)
	return {
		props: {
			dataFetch: await getGameDtl(gameSearchConfig)
		}
	}
}

export default Game