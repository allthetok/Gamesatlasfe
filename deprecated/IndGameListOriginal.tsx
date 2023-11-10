/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { createExploreAxiosConfig } from '../helpers/fctns'
import { Explore } from '../../backendga/helpers/betypes'
import { Button, Autocomplete, TextField, SvgIcon } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { Search } from '../components/Client/Search'
import { IndGame } from '../components/Client/IndGame'
import { IconSx, ListTblToggleSx, AscDescSx } from '../sxstyling/styles'
import { MyTextField, StyledComponents } from '../sxstyling/styledmui'
import { theme } from '../sxstyling/theme'
import { IndGameTable } from '../components/Client/IndGameTable'
import './IndGameList.css'

const IndGameList = () => {
	const [multiResp, setMultiResp] = useState<Explore[]>([])

	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const [sortBy, setSortBy] = useState('IGDB Rating')
	const [sortDirection, setSortDirection] = useState('desc')
	const [platform, setPlatform] = useState('')
	const [limit, setLimit] = useState('25')
	const [genre, setGenre] = useState('')
	const [viewToggle, setViewToggle] = useState('list')

	const numOptions = ['10', '25', '50', '100']
	const platformOptions = ['PC', 'Playstation', 'Xbox', 'Nintendo', 'Linux', '']
	const sortOptions = ['IGDB Rating', 'Relevance', 'Title', 'Release Date']

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
		<><Search />
			<div className='explore-wrap'>
				{loading ?
					<ReactLoading type={'spinningBubbles'} color={'#ddd'} height={150} width={150} />
					: <></>}
				{!loading && !error && multiResp ?
					<div>
						<div className='filter-wrap'>
							<div className='ascdesc-wrap'>
								<Button sx={AscDescSx(sortDirection, 'ascbtn')} onClick={() => setSortDirection('asc')} variant={sortDirection === 'asc' ? 'contained' : 'outlined'}>
								Ascending
								</Button>
								<Button sx={AscDescSx(sortDirection, 'descbtn')} onClick={() => setSortDirection('desc')} variant={sortDirection === 'desc' ? 'contained' : 'outlined'}>
								Descending
								</Button>
							</div>
							<div className='drop-wrap'>
								<ThemeProvider theme={theme}>
									<Autocomplete
										className='auto-comp'
										disablePortal
										id='combo-box'
										options={sortOptions}
										value={sortBy}
										onChange={onSortChange}
										sx={{ width: 250, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginRight: '0.75rem' }} renderInput={(params) => <TextField {...params} label="Sort By" />} />
								</ThemeProvider>
								<ThemeProvider theme={theme}>
									<Autocomplete
										className='auto-comp'
										disablePortal
										id='combo-box'
										options={platformOptions}
										value={platform}
										onChange={onPlatformChange}
										sx={{ width: 250, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginRight: '0.75rem' }} renderInput={(params) => <TextField {...params} label="Platform" />} />
								</ThemeProvider>
								<ThemeProvider theme={theme}>
									<Autocomplete
										className='auto-comp'
										disablePortal
										id='combo-box'
										options={numOptions}
										value={limit}
										onChange={onLimitChange}
										sx={{ width: 150, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginRight: '0.75rem' }} renderInput={(params) => <TextField {...params} label="Limit" />} />
								</ThemeProvider>
							</div>
							<div className='button-wrap'>
								<Button sx={ListTblToggleSx(viewToggle, 'listbtn')} onClick={() => setViewToggle('list')} variant={viewToggle === 'list' ? 'contained' : 'outlined'}>
									<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
										<GridViewIcon />
									</SvgIcon>
								</Button>
								<Button sx={ListTblToggleSx(viewToggle, 'tblbtn')} onClick={() => setViewToggle('table')} variant={viewToggle === 'table' ? 'contained' : 'outlined'}>
									<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
										<TableRowsIcon />
									</SvgIcon>
								</Button>
							</div>
						</div>
						{viewToggle === 'list' ?
							<div className='grid-wrapper'>
								{multiResp.map((item: Explore) => (
									<IndGame key={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} />
								))}
							</div>
							: <IndGameTable multiResp={multiResp} />}
					</div>
					: <></>}
			</div></>
	)
}

export { IndGameList }