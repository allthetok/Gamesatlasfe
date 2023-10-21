/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { Button, Autocomplete, TextField, SvgIcon, styled } from '@mui/material'
import { ThemeProvider, makeStyles } from '@mui/material/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { createAxiosConfig } from '../helpers/fctns'
import { IndGame } from './IndGame'
import { IndGameTable } from './IndGameTable'
import { IconSx, ListTblToggleSx } from '../sxstyling/styles'
import { theme } from '../sxstyling/theme'
import './IndGameList.css'

const IndGameList = () => {
	const [multiResp, setMultiResp] = useState([])
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
		const searchConfig = createAxiosConfig('post', 'explore', sortBy, sortDirection, platform, limit, genre)
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

	const MyTextField = styled(TextField)({
		color: '#dddddd',
		backgroundColor: '#202020'
	})

	const StyledComponents = () => {
		return <MyTextField>Styled Components</MyTextField>
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
						<ThemeProvider theme={theme}>
							<Autocomplete
								className='auto-comp'
								disablePortal
								id='combo-box'
								options={numOptions}
								value={limit}
								onChange={onLimitChange}
								sx={{ width: 150, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginLeft: '0.75rem', marginRight: '1.25rem' }} renderInput={(params) =>  <TextField {...params} label="Limit" />}
							/>
						</ThemeProvider>
						<ThemeProvider theme={theme}>
							<Autocomplete
								className='auto-comp'
								disablePortal
								id='combo-box'
								options={platformOptions}
								value={platform}
								onChange={onPlatformChange}
								sx={{ width: 250, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginLeft: '0.75rem', marginRight: '1.25rem' }} renderInput={(params) =>  <TextField {...params} label="Platform" />}
							/>
						</ThemeProvider>
						<ThemeProvider theme={theme}>
							<Autocomplete
								className='auto-comp'
								disablePortal
								id='combo-box'
								options={sortOptions}
								value={sortBy}
								onChange={onSortChange}
								sx={{ width: 250, bgcolor: '#ddd', backgroundColor: '#121212', borderRadius: '10px', marginLeft: '0.75rem', marginRight: '1.25rem' }} renderInput={(params) =>  <TextField {...params} label="Sort By" />}
							/>
						</ThemeProvider>

						{/* <Autocomplete className='auto-comp' disablePortal id='combo-box' options={platformOptions} value={platform} onChange={onPlatformChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center',  marginLeft: '0rem', marginRight: '1.25rem' }} renderInput={(params) => <TextField {...params} sx={{ input: { color: '#ddd' }} } label="Platform"/>} />
						<Autocomplete className='auto-comp' disablePortal id='combo-box' options={sortOptions} value={sortBy} onChange={onSortChange} sx={{ width: 150, bgcolor: '#ddd', borderRadius: '20px', float: 'center',  marginLeft: '0rem', marginRight: '1.25rem' }} renderInput={(params) => <TextField {...params} sx={{ color: '#ddd' }} label="Sort By"/>} /> */}
						<Button onClick={() => setSortDirection('asc')} variant={sortDirection === 'asc' ? 'contained' : 'outlined'} disabled={sortDirection === 'asc'}>Ascending</Button>
						<Button onClick={() => setSortDirection('desc')} variant={sortDirection === 'desc' ? 'contained' : 'outlined'} disabled={sortDirection === 'desc'}>Descending</Button>
						<Button sx={ListTblToggleSx(viewToggle, 'listbtn')} onClick={() => setViewToggle('list')} variant={viewToggle === 'list' ? 'contained' : 'outlined'}>
							{/* disabled={viewToggle === 'list'}> */}
							<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
								<GridViewIcon/>
							</SvgIcon>
						</Button>
						<Button sx={ListTblToggleSx(viewToggle, 'tblbtn')} onClick={() => setViewToggle('table')} variant={viewToggle === 'table' ? 'contained' : 'outlined'}>
							{/* disabled={viewToggle === 'table'} */}
							<SvgIcon sx={IconSx} fontSize='large' htmlColor='#ddd'>
								<TableRowsIcon/>
							</SvgIcon>
						</Button>
					</div>
					{ viewToggle === 'list' ?
						<div className='grid-wrapper'>
							{multiResp.map((item: any) => (
								<IndGame key={item.id} cover={item.cover} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes} title={item.title} genres={item.genres} companies={item.involved_companies} />
							))}
						</div>
						: <IndGameTable multiResp={multiResp}/>
					}
				</div>
				: <></>
			}
		</div>
	)
}

export { IndGameList }