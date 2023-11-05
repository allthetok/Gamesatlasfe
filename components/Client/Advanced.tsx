import React, { useState } from 'react'
import { Search } from './Search'
import { platformButtonArray, searchButtonArray } from '../../helpers/button'
import { Box, Button, Slider } from '@mui/material'
import { BoxAdvActiveSx, BoxAdvSx, BoxSx, ButtonAdvActiveSx, ButtonAdvSx, ButtonSx } from '../../sxstyling/styles'
import './Advanced.css'


const Advanced = () => {
	const [searchTab, setSearchTab] = useState(searchButtonArray[0])

	const SwitchRender = (currentTab: string) => {
		switch(currentTab) {
		case 'Platforms':
			return (
				<ul className='adv-nav-tabs'>
					{platformButtonArray.map((platform: string) => (
						<li className='adv-nav-tabs-li' key={platform}>
							<Box sx={BoxSx}>
								<Button sx={ButtonSx}>
									{platform}
								</Button>
							</Box>
						</li>
					))}
				</ul>
			)
		case 'Release Date':
			return (
				<div>
					<Box sx={{ width: 300 }}>
						<Slider
							aria-label='Always visible'
							defaultValue={1950}
							// getAriaValueText={valuetext}
							step={1}
							valueLabelDisplay='on'
						/>
						From Year
						<Slider
							aria-label='Always visible'
							defaultValue={1950}
							// getAriaValueText={valuetext}
							step={1}
							valueLabelDisplay='on'
						/>
						To Year
					</Box>
				</div>
			)
		default:
			return (
				<div>
					None
				</div>
			)
		}
	}

	return (
		<>
			<Search/>
			<div className='adv-wrapper'>
				<h2>Advanced Search</h2>
				<ul className='adv-nav-tabs'>
					{searchButtonArray.map((el: string) => (
						<li className='adv-nav-tabs-li' key={el}>
							<Box sx={el === searchTab ? BoxAdvActiveSx : BoxAdvSx} onClick={() => setSearchTab(el)}>
								<Button sx={el === searchTab ? ButtonAdvActiveSx : ButtonAdvSx}>
									{el}
								</Button>
							</Box>
						</li>
					))}
				</ul>
				{SwitchRender(searchTab)}
			</div>
		</>
	)
}

export { Advanced }