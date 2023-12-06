/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useCallback } from 'react'
import { useLikes } from '../../hooks/useLikes'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import ReactLoading from 'react-loading'
import { useFilterContext } from '@/app/filtercontext'
import { useAdvFilterContext } from '@/app/advfiltercontext'
import { AdvFilterContextObj, AxiosConfigIndGameList, FilterContextObj, Explore } from '../../helpers/fetypes'
import { createExploreAxiosConfig, createAdvancedAxiosConfig } from '../../helpers/fctns'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import './IndGameList.css'


const IndGameList = () => {
	const [multiResp, setMultiResp] = useState<Explore[]>([])
	const [errorIGDB, setErrorIGDB] = useState(null)
	const [loadingIGDB, setLoadingIGDB] = useState(true)

	const data = useSession()
	const { likeDataFetch, error, loading } = useLikes(data.data?.user.id)

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
		setLoadingIGDB(true)
		await axios(searchConfig)
			.then((response) => {
				setMultiResp(response.data)
				setLoadingIGDB(false)
			})
			.catch((err) => {
				setErrorIGDB(err)
				console.error(err)
			})
	}, [sortBy, sortDirection, platform, limit, genre, dateYear, rating, platforms, genres, themes, gameModes, categories, companyList])

	useEffect(() => {
		getMultiResp()
	}, [getMultiResp])

	return (
		<>
			{loadingIGDB ?
				<div className='load-wrapper'>
					<ReactLoading type={'spinningBubbles'} color={'#ddd'} height={200} width={200} />
				</div>
				: <></>}
			{!loadingIGDB && !errorIGDB && multiResp ?
				<div>
					{viewToggle === 'list' ?
						<div className='grid-wrapper'>
							{multiResp.map((item: Explore) => (
								<IndGame key={item.id} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} liked={likeDataFetch.length !== 0 ? likeDataFetch.map((item: any) => item.gameobj).filter((game: any) => game.id === item.id).length !== 0 : false} />
							))}
						</div>
						: <IndGameTable multiResp={multiResp} />}
				</div>
				: <></>}
		</>
	)
}

export { IndGameList }