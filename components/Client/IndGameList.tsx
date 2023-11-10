/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { useFilterContext } from '@/app/filtercontext'
import { FilterContextObj } from '../../helpers/fetypes'
import { createExploreAxiosConfig } from '../../helpers/fctns'
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

	const getMultiResp = useCallback(async () => {
		const searchConfig = createExploreAxiosConfig('post', 'explore', sortBy, sortDirection, platform, limit, genre)
		setLoading(true)
		await axios(searchConfig)
			.then((response) => {
				setMultiResp(response.data)
				console.log(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)
			})
	}, [sortBy, sortDirection, platform, limit, genre])

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