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


export { buttonArray, ssrButtonArray }