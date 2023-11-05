import { ButtonField } from './fetypes'

const buttonArray: ButtonField[] = [
	{
		link: '/game',
		formatName: 'Overview'
	},
	{
		link: '/game/artwork',
		formatName: 'Artworks'
	},
	{
		link: '/game/screenshot',
		formatName: 'Screenshots'
	},
	{
		link: '/game/similargame',
		formatName: 'Similar Games'
	},
	{
		link: '/game/video',
		formatName: 'Videos'
	},
	{
		link: '/game/website',
		formatName: 'Community Websites'
	},
	{
		link: '/game/language',
		formatName: 'Language Details'
	},
]

const ssrButtonArray: ButtonField[] = [
	{
		link: '/game',
		formatName: 'Overview'
	},
	{
		link: '/artwork',
		formatName: 'Artworks'
	},
	{
		link: '/screenshot',
		formatName: 'Screenshots'
	},
	{
		link: '/similargame',
		formatName: 'Similar Games'
	},
	{
		link: '/video',
		formatName: 'Videos'
	},
	{
		link: '/website',
		formatName: 'Community Websites'
	},
	{
		link: '/language',
		formatName: 'Language Details'
	},
]

const searchButtonArray = [
	'Platforms',
	'Release Date',
	'Genres',
	'Themes',
	'Modes',
	'Companies',
	'Keywords'
]

const platformButtonArray = [
	'Mac',
	'PC (Microsoft Windows)',
	'Linux',
	'Xbox Series X|S',
	'PlayStation 5',
	'Xbox One',
	'PlayStation 4',
	'Nintendo Switch',
	'PlayStation 3',
	'Xbox 360'
]


export { buttonArray, ssrButtonArray, searchButtonArray, platformButtonArray }