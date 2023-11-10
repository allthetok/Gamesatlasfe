/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SyntheticEvent } from 'react'
import { FilterContextObj } from '../../helpers/fetypes'
import { useFilterContext } from '@/app/filtercontext'
import { Button, Autocomplete, TextField, SvgIcon } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { IconSx, ListTblToggleSx, AscDescSx } from '../../sxstyling/styles'
import { theme } from '../../sxstyling/theme'
import './IndGameList.css'

const Filter = () => {
	const {
		sortBy, setSortBy,
		sortDirection, setSortDirection,
		platform, setPlatform,
		limit, setLimit,
		genre, setGenre,
		viewToggle, setViewToggle
	}: FilterContextObj = useFilterContext()

	const numOptions = ['10', '25', '50', '100']
	const platformOptions = ['PC', 'Playstation', 'Xbox', 'Nintendo', 'Linux', '']
	const sortOptions = ['IGDB Rating', 'Relevance', 'Title', 'Release Date']

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
	)
}

export { Filter }