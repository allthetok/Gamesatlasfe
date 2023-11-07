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
	'Rating',
	'Genres',
	'Themes',
	'Game Modes',
	'Category',
	'Companies',
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

const genresButtonArray = [
	'Fighting',
	'Shooter',
	'Music',
	'Platform',
	'Puzzle',
	'Racing',
	'Real Time Strategy (RTS)',
	'Role-playing (RPG)',
	'Simulator',
	'Point-and-click',
	'Sport',
	'Strategy',
	'MOBA',
	'Tactical',
	'Hack and slash/Beat em up',
	'Card & Board Game',
	'Pinball',
	'Adventure',
	'Arcade',
	'Visual Novel',
	'Indie',
	'Quiz/Trivia',
	'Turn-based strategy (TBS)'
]

const themesButtonArray = [
	'Fantasy',
	'Thriller',
	'Science fiction',
	'Action',
	'Horror',
	'Survival',
	'Historical',
	'Stealth',
	'Business',
	'Comedy',
	'Drama',
	'Non-fiction',
	'Educational',
	'Sandbox',
	'Kids',
	'Open world',
	'Warfare',
	'Erotic',
	'Mystery',
	'Party',
	'Romance'
]

const gameModesButtonArray = [
	'Battle Royale',
	'Co-operative',
	'Massively Multiplayer Online (MMO)',
	'Multiplayer',
	'Single player',
	'Split screen'
]

const categoriesButtonArray = [
	'Main Game',
	'DLC',
	'Expansion',
	'Bundle',
	'Standalone Expansion',
	'Mod',
	'Remake',
	'Remaster'
]

const yearMarks = [ { value: 1973,label: '1973' }, { value: 1978,label: '1978' },{ value: 1983,label: '1983' },{ value: 1988,label: '1988' },{ value: 1993,label: '1993' },{ value: 1998,label: '1998' },{ value: 2003,label: '2003' },{ value: 2008,label: '2008' },{ value: 2013,label: '2013' },{ value: 2018,label: '2018' },{ value: 2023,label: '2023' },]

const ratingMarks = [{ value: 0, label: '0' }, { value: 5, label: '5' }, { value: 10, label: '10' }, { value: 15, label: '15' }, { value: 20, label: '20' }, { value: 25, label: '25' }, { value: 30, label: '30' }, { value: 35, label: '35' }, { value: 40, label: '40' }, { value: 45, label: '45' }, { value: 50, label: '50' }, { value: 55, label: '55' }, { value: 60, label: '60' }, { value: 65, label: '5' }, { value: 70, label: '70' }, { value: 75, label: '75' }, { value: 80, label: '80' }, { value: 85, label: '85' }, { value: 90, label: '90' }, { value: 95, label: '95' }, { value: 100, label: '100' }]


export { buttonArray, ssrButtonArray, searchButtonArray, platformButtonArray, genresButtonArray, themesButtonArray, gameModesButtonArray, categoriesButtonArray, yearMarks, ratingMarks }