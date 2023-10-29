/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import { GameObj } from '../../../backendga/helpers/betypes'
import { Inter } from 'next/font/google'
import GameDtlServer from '../../components/GameDtlServer'
import '../../src/app/globals.css'
const inter = Inter({ subsets: ['latin'] })

const Game = (props: { dataFetch: GameObj }) => {
	return (
		<main className={inter.className}>
			<GameDtlServer dataFetch={props.dataFetch}/>
		</main>
	)
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	console.log(context.params)
	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/overview',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'searchterm': `${context.params!.query}`
		}
	}
	console.log(searchConfig)
	const res: GameObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return {
		props: {
			dataFetch: res
		}
	}
}

export default Game