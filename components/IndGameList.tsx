import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { Button, Autocomplete, TextField } from '@mui/material'
import { IndGame } from './IndGame'
import './IndGameList.css'

const IndGameList = () => {
	const [multiResp, setMultiResp] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const [sortBy, setSortBy] = useState('')
	const [externalFilter, setExternalFilter] = useState('')
	const [limit, setLimit] = useState('25')

	const numOptions = ['5', '10', '25', '50']

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/explore',
		headers: {
			'Content-Type': 'application/json'
		},
		data : {
			'sortBy': 'total_rating desc',
			'externalFilter': 'total_rating_count > 100 & age_ratings!=n',
			'limit': 25
		}
	}
	const getMultiResp = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setMultiResp(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)
			})
	}, [])

	useEffect(() => {
		getMultiResp()
	}, [getMultiResp])

	const onTextChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setLimit(value!)
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
						<Autocomplete className='auto-comp' disablePortal id='combo-box' options={numOptions} onChange={onTextChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center' }} renderInput={(params) => <TextField {...params} sx={{ color: '#dddddd' }} label="Limit"/>} />
					</div>
					{/* <Button onClick={() => setSortOptions('AIR_DATE')} variant={sortOptions === 'AIR_DATE' ? 'contained' : 'outlined'}>Released</Button>
						<Button onClick={() => setSortOptions('ALPHABETICAL')} variant={sortOptions === 'ALPHABETICAL' ? 'contained' : 'outlined'}>Alphabetical</Button>
						<Button onClick={() => setSortOptions('RELEVANCE')} variant={sortOptions === 'RELEVANCE' ? 'contained' : 'outlined'}>Relevance</Button> */}
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