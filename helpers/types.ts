import { AgeRatings, Categories, Companies, Covers, Languages, Platforms, Videos } from '../../backendga/helpers/requests'

type ButtonField = {
	link: string,
	formatName: string
}

type LanguageTable = {
	language: string,
	locale: string,
	native: string,
	language_support_types: string[]
}

type GameDetailObj = {
	id: number | null,
	age_ratings: AgeRatings,
	artworks: string[],
	cover: string | undefined,
	external_games: Categories[],
	game_modes: string[],
	genres: string[],
	hypes: number | null,
	involved_companies: Companies[],
	keywords: string[],
	platforms: Platforms[],
	player_perspectives: string[],
	screenshots: string[],
	similar_games: Covers[],
	tags: string,
	themes: string[],
	videos: Videos[],
	websites: Categories[],
	language_supports: Languages[],
	game_localizations: string,
	rating: number,
	ratingCount: number | null,
	releaseDate:  string,
	likes: number | null,
	title: string,
	story: string,
	summary: string,
	url: string
}

type GameContextObj = {
	dataFetch: GameDetailObj | undefined,
	error: null,
	loading: boolean
}

export type { ButtonField, GameDetailObj, LanguageTable, GameContextObj }