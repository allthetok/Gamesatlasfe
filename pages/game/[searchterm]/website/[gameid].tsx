/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import { createAuxiliaryConfig } from '../../../../helpers/fctns'
import { GlobalAuxiliaryObj, WebsitesObj } from '../../../../../backendga/helpers/betypes'
import { NestedSearchConfig } from '../../../../helpers/fetypes'
import Websites from '../../../../components/Server/Websites'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'
import { Footer } from '../../../../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

const Website = (props: { dataFetch: WebsitesObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<><main className={inter.className}>
			<Websites dataFetch={props.dataFetch} gameID={props.gameID} />
		</main><Footer /></>
	)
}

const getWebsiteDtl = async (searchConfig: NestedSearchConfig) => {
	const resultWebsiteObj: WebsitesObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultWebsiteObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const websiteSearchConfig = createAuxiliaryConfig('post', 'websites', context.params!.gameid!)
	return {
		props: {
			dataFetch: await getWebsiteDtl(websiteSearchConfig),
			gameID: websiteSearchConfig.data.gameid
		}
	}
}

export default Website