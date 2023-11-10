/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import ReactLoading from 'react-loading'
import { useFilterContext } from '@/app/filtercontext'
import { useAdvFilterContext } from '@/app/advfiltercontext'
import { AdvFilterContextObj, AxiosConfigIndGameList, FilterContextObj } from '../../helpers/fetypes'
import { createExploreAxiosConfig, createAdvancedAxiosConfig } from '../../helpers/fctns'
import { Explore } from '../../../backendga/helpers/betypes'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import './IndGameList.css'


const IndGameList = () => {
	const [multiResp, setMultiResp] = useState<Explore[]>([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const {
		sortBy,
		sortDirection,
		platform,
		limit,
		genre,
		viewToggle
	}: FilterContextObj = useFilterContext()

	const {
		dateYear,
		rating,
		platforms,
		genres,
		themes,
		gameModes,
		categories,
		companyList
	}: AdvFilterContextObj = useAdvFilterContext()

	const path = usePathname()

	const getMultiResp = useCallback(async () => {
		const searchConfig: AxiosConfigIndGameList = path === '/advsearch' ? createAdvancedAxiosConfig('post', 'advsearch', sortBy, sortDirection, limit, platforms, genres, themes, gameModes, categories, rating, dateYear, companyList) : createExploreAxiosConfig('post', 'explore', sortBy, sortDirection, platform, limit, genre)
		setLoading(true)
		await axios(searchConfig)
			.then((response) => {
				setMultiResp(response.data)
				// console.log(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)
			})
	}, [sortBy, sortDirection, platform, limit, genre, dateYear, rating, platforms, genres, themes, gameModes, categories, companyList])

	useEffect(() => {
		getMultiResp()
	}, [getMultiResp])

	return (
		<>
			{loading ?
				<ReactLoading type={'spinningBubbles'} color={'#ddd'} height={150} width={150} />
				: <></>}
			{!loading && !error && multiResp ?
				<div>
					{viewToggle === 'list' ?
						<div className='grid-wrapper'>
							{multiResp.map((item: Explore) => (
								<IndGame key={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} />
							))}
						</div>
						: <IndGameTable multiResp={multiResp} />}
				</div>
				: <></>}
		</>
	)
}

export { IndGameList }