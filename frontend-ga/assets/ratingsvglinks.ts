// const ESRB = {
// 	6: 'https://www.esrb.org/wp-content/uploads/2021/12/RP-LM17-English.svg',
// 	7: 'https://www.esrb.org/wp-content/uploads/2019/05/RP.svg',
// 	8: 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg',
// 	9: 'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg',
// 	10: 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg',
// 	11: 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg',
// 	12: 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg'
// }

// enum ESRB {
// 	Six = 'https://www.esrb.org/wp-content/uploads/2021/12/RP-LM17-English.svg',
// 	Seven = 'https://www.esrb.org/wp-content/uploads/2019/05/RP.svg',
// 	Eight = 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg',
// 	Nine = 'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg',
// 	Ten = 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg',
// 	Eleven =  'https://www.esrb.org/wp-content/uploads/2019/05/M.svg',
// 	12: 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg'
// 	}
// }

const ESRB = [
	{ 'IGDBRating': 6, 'src': 'https://www.esrb.org/wp-content/uploads/2021/12/RP-LM17-English.svg' },
	{ 'IGDBRating': 7, 'src': 'https://www.esrb.org/wp-content/uploads/2019/05/RP.svg' },
	{ 'IGDBRating': 8, 'src': 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg' },
	{ 'IGDBRating': 9, 'src': 'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg' },
	{ 'IGDBRating': 10, 'src':  'https://www.esrb.org/wp-content/uploads/2019/05/T.svg' },
	{ 'IGDBRating': 11, 'src': 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg' },
	{ 'IGDBRating': 12, 'src': 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg' }
]

const PEGI = [
	{ 'IGDBRating': 1, 'src': 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/2000px-PEGI_3.svg_.png?itok=v29cXS0R' },
	{ 'IGDBRating': 2, 'src': 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi7.png?itok=eI0Gk8v4' },
	{ 'IGDBRating': 3, 'src': 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/PEGI_12.png?itok=YbTznZS9' },
	{ 'IGDBRating': 4, 'src': 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi16.png?itok=GyBvYeoU' },
	{ 'IGDBRating': 5, 'src':  'https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi18.png?itok=2iF_eHO6' }
]

const ExternalCategories = [
	{ 'source': 1, 'category': 'Steam' },
	{ 'source': 5, 'category': 'GOG Galaxy' },
	{ 'source': 10, 'category': 'Youtube' },
	{ 'source': 11, 'category': 'Microsoft Store' },
	{ 'source': 13, 'category': 'Apple Store' },
	{ 'source': 14, 'category': 'Twitch' },
	{ 'source': 15, 'category': 'Google Play Store' },
	{ 'source': 20, 'category': 'Amazon' },
	{ 'source': 22, 'category': 'Amazon' },
	{ 'source': 23, 'category': 'Amazon' },
	{ 'source': 26, 'category': 'Epic Games Store' },
	{ 'source': 28, 'category': 'Oculus' },
	{ 'source': 29, 'category': 'Utomik' },
	{ 'source': 30, 'category': 'itch io' },
	{ 'source': 31, 'category': 'Xbox Marketplace' },
	{ 'source': 32, 'category': 'Kartridge' },
	{ 'source': 36, 'category': 'Playstation Store' },
	{ 'source': 37, 'category': 'Focus Entertainment' },
	{ 'source': 54, 'category': 'Xbox Game Pass' },
	{ 'source': 55, 'category': 'Game Jolt' },
]

const WebsiteCategories = [
	{ 'source': 1, 'category': 'Official' },
	{ 'source': 2, 'category': 'Fandom Wiki' },
	{ 'source': 3, 'category': 'Wikipedia' },
	{ 'source': 4, 'category': 'Facebook' },
	{ 'source': 5, 'category': 'Twitter' },
	{ 'source': 6, 'category': 'Twitch' },
	{ 'source': 8, 'category': 'Instagram' },
	{ 'source': 9, 'category': 'Youtube' },
	{ 'source': 10, 'category': 'Apple Store' },
	{ 'source': 11, 'category': 'Apple Store' },
	{ 'source': 12, 'category': 'Android' },
	{ 'source': 13, 'category': 'Steam' },
	{ 'source': 14, 'category': 'Subreddit' },
	{ 'source': 15, 'category': 'itch io' },
	{ 'source': 16, 'category': 'Epic Games' },
	{ 'source': 17, 'category': 'GOG Galaxy' },
	{ 'source': 18, 'category': 'Discord Server' },
]

// const PEGI = {
// 	1: 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/2000px-PEGI_3.svg_.png?itok=v29cXS0R',
// 	2: 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi7.png?itok=eI0Gk8v4',
// 	3: 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/PEGI_12.png?itok=YbTznZS9',
// 	4: 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi16.png?itok=GyBvYeoU',
// 	5: 'https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi18.png?itok=2iF_eHO6'
// }

export { ESRB, PEGI, ExternalCategories, WebsiteCategories }