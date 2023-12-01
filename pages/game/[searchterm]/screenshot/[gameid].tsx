/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { createAuxiliaryConfig } from '../../../../helpers/fctns'
import { GetServerSidePropsContext } from 'next/types'
import { GlobalAuxiliaryObj, ScreenshotObj } from '../../../../../backendga/helpers/betypes'
import { NestedSearchConfig } from '../../../../helpers/fetypes'
import Screenshots from '../../../../components/Server/Screenshots'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'
import { Footer } from '../../../../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

const Screenshot = (props: { dataFetch: ScreenshotObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<><main className={inter.className}>
			<Screenshots dataFetch={props.dataFetch} gameID={props.gameID} />
		</main><Footer /></>
	)
}

const getScreenshotDtl = async (searchConfig: NestedSearchConfig) => {
	const resultScreenshotObj: ScreenshotObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultScreenshotObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const screenshotSearchConfig = createAuxiliaryConfig('post', 'screenshots', context.params!.gameid!)
	return {
		props: {
			dataFetch: await getScreenshotDtl(screenshotSearchConfig),
			gameID: screenshotSearchConfig.data.gameid
		}
	}
}

export default Screenshot