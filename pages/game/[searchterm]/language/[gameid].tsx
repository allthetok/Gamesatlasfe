/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { createAuxiliaryConfig } from '../../../../helpers/fctns'
import { GetServerSidePropsContext } from 'next/types'
import { NestedSearchConfig, LanguageObj, GlobalAuxiliaryObj } from '../../../../helpers/fetypes'
import Languages from '../../../../components/Server/Languages'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'
import { Footer } from '../../../../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

const Language = (props: { dataFetch: LanguageObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<><main className={inter.className}>
			<Languages dataFetch={props.dataFetch} gameID={props.gameID} />
		</main><Footer /></>
	)
}

const getLanguageDtl = async (searchConfig: NestedSearchConfig) => {
	const resultLanguageObj: LanguageObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultLanguageObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const languageSearchConfig = createAuxiliaryConfig('post', 'language', context.params!.gameid!)
	return {
		props: {
			dataFetch: await getLanguageDtl(languageSearchConfig),
			gameID: languageSearchConfig.data.gameid
		}
	}
}

export default Language