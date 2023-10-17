/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { Button, Autocomplete, TextField } from '@mui/material'
import { createAxiosConfig } from '../helpers/fctns'
import { IndGame } from './IndGame'
import './IndGameList.css'

const IndGameList = () => {
	const [multiResp, setMultiResp] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const [sortBy, setSortBy] = useState('IGDB Rating')
	const [sortDirection, setSortDirection] = useState('desc')
	const [platform, setPlatform] = useState('')
	const [limit, setLimit] = useState('25')
	const [viewToggle, setViewToggle] = useState('list')

	const numOptions = ['10', '25', '50', '100']
	const platformOptions = ['PC', 'Playstation', 'Xbox', 'Nintendo', 'Linux']
	const sortOptions = ['IGDB Rating', 'Relevance', 'Title', 'Release Date']

	const getMultiResp = useCallback(async () => {
		const searchConfig = createAxiosConfig('post', 'explore', sortBy, sortDirection, platform, limit)
		setLoading(true)
		await axios(searchConfig)
			.then((response) => {
				setMultiResp(response.data)
				console.log(response.data)
				console.log('effect fired')
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)
			})
	}, [sortBy, sortDirection, platform, limit])

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
		setSortBy(value!)
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
						<Autocomplete className='auto-comp' disablePortal id='combo-box' options={platformOptions} onChange={onPlatformChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center' }} renderInput={(params) => <TextField {...params} sx={{ color: '#dddddd' }} label="Platform"/>} />
						<Autocomplete className='auto-comp' disablePortal id='combo-box' options={sortOptions} onChange={onSortChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center' }} renderInput={(params) => <TextField {...params} sx={{ color: '#dddddd' }} label="Sort By"/>} />
						<Button onClick={() => setSortDirection('asc')} variant={sortDirection === 'asc' ? 'contained' : 'outlined'} disabled={sortDirection === 'asc'}>Ascending</Button>
						<Button onClick={() => setSortDirection('desc')} variant={sortDirection === 'desc' ? 'contained' : 'outlined'} disabled={sortDirection === 'desc'}>Descending</Button>
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