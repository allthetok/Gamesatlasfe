/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import { GlobalAuxiliaryObj } from '../../../../../backendga/helpers/betypes'
import { createAuxiliaryConfig } from '../../../../helpers/fctns'
import { NestedSearchConfig, LanguageObj } from '../../../../helpers/fetypes'
import Languages from '../../../../components/Server/Languages'
import { Inter } from 'next/font/google'
import '../../../../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const Language = (props: { dataFetch: LanguageObj & GlobalAuxiliaryObj, gameID: number }) => {
	return (
		<main className={inter.className}>
			<Languages dataFetch={props.dataFetch} gameID={props.gameID}/>
		</main>
	)
}

const getLanguageDtl = async (searchConfig: NestedSearchConfig) => {
	const resultArtObj: LanguageObj & GlobalAuxiliaryObj = await axios(searchConfig)
		.then((response) => {
			return response.data
		})
		.catch((err) => {
			console.error(err)
		})
	return resultArtObj
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