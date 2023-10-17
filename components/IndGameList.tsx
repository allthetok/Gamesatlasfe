import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { Button, Autocomplete, TextField } from '@mui/material'
import { sortMap, platformMap } from '../helpers/fctns'
import { IndGame } from './IndGame'
import './IndGameList.css'

const IndGameList = () => {
	const [multiResp, setMultiResp] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const [sortBy, setSortBy] = useState('desc')
	const [externalFilter, setExternalFilter] = useState('IGDB Rating')
	const [platform, setPlatform] = useState('')
	const [limit, setLimit] = useState('25')

	const numOptions = ['10', '25', '50', '100']
	const platformOptions = ['PC', 'Playstation', 'Xbox', 'Nintendo', 'Linux']
	const sortOptions = ['IGDB Rating', 'Relevance', 'Title', 'Release Date']

	// const searchConfig = {
	// 	method: 'post',
	// 	url: 'http://localhost:3001/api/explore',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	data : {
	// 		'sortBy': 'total_rating desc',
	// 		'externalFilter': 'total_rating_count > 50 & age_ratings!=n',
	// 		'limit': 25
	// 	}
	// }

	/*
	PASS platform Option as ExternalFilter and have backend map it to actual necessary query.
	*/

	const getMultiResp = useCallback(async () => {
		const searchConfig = {
			method: 'post',
			url: 'http://localhost:3001/api/explore',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'sortBy': `${sortMap.get(externalFilter)} ${sortBy}`,
				'externalFilter': 'total_rating_count > 50 & age_ratings!=n & follows!=n',
				'limit': parseInt(limit)
			}
		}
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
	}, [sortBy, externalFilter, limit])

	useEffect(() => {
		getMultiResp()
	}, [getMultiResp])

	const onLimitChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setLimit(value!)
	}

	const onPlatformChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setPlatform(value!)
	}

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setExternalFilter(value!)
	}

	return (
		<div>
			{loading ?
				<ReactLoading type={'spinningBubbles'} color={'#ddd'} height={150} width={150} />
				: <></>
			}
			{!loading && !error && multiResp ?
				<div>
					<div className='filter-wrap'>
						<Autocomplete className='auto-comp' disablePortal id='combo-box' options={numOptions} onChange={onLimitChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center' }} renderInput={(params) => <TextField {...params} sx={{ color: '#dddddd' }} label="Limit"/>} />
						{/* <Autocomplete className='auto-comp' disablePortal id='combo-box' options={platformOptions} onChange={onPlatformChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center' }} renderInput={(params) => <TextField {...params} sx={{ color: '#dddddd' }} label="Platform"/>} /> */}
						<Autocomplete className='auto-comp' disablePortal id='combo-box' options={sortOptions} onChange={onSortChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center' }} renderInput={(params) => <TextField {...params} sx={{ color: '#dddddd' }} label="Sort By"/>} />
						<Button onClick={() => setSortBy('asc')} variant={sortBy === 'asc' ? 'contained' : 'outlined'} disabled={sortBy === 'asc'}>Ascending</Button>
						<Button onClick={() => setSortBy('desc')} variant={sortBy === 'desc' ? 'contained' : 'outlined'} disabled={sortBy === 'desc'}>Descending</Button>
					</div>
					<div className='grid-wrapper'>
						{multiResp.map((item: any) => (
							<IndGame key={item.id} cover={item.cover} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes} title={item.title} />
						))}
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { IndGameList }