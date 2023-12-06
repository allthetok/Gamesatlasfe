/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { useLikes } from '../../hooks/useLikes'
import { useSession } from 'next-auth/react'
import { searchtermToString } from '../../helpers/fctns'
import { LocalStorageObj, Companies, Explore, GlobalAuxiliaryObj, SimilarGamesObj } from '../../helpers/fetypes'
import { IndGame } from '../Client/IndGame'
import { NavGame } from '../Server/NavGame'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'
import '../Client/IndGameList.css'
import './GameDtl.css'
import '../Client/Similar.css'


type SimilarProps = {
	dataFetch: SimilarGamesObj & GlobalAuxiliaryObj,
	gameID: number
}

const Similar = ({ dataFetch, gameID }: SimilarProps) => {
	const data = useSession()
	const { likeDataFetch } = useLikes(data.data !== null ? data?.data.user?.id : null)


	const auxiliaryObj: LocalStorageObj = {
		gameID: gameID,
		title: dataFetch.title,
		involved_companies: dataFetch.involved_companies.map((company: Companies) => company.name).join(', '),
		summary: dataFetch.summary,
		story: dataFetch.story,
		releaseDate: dataFetch.releaseDate
	}


	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame title={auxiliaryObj.title} gameID={gameID} searchterm={searchtermToString(useRouter().query.searchterm!)}/>
				<div>
					<div className='similar-grid-wrapper'>
						{dataFetch.similar_games.map((item: Explore) => (
							<IndGame key={item.id} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} liked={likeDataFetch.length !== 0 ? likeDataFetch.map((item: any) => item.gameobj).filter((game: any) => game.id === item.id).length !== 0 : false} />
						))}
					</div>
				</div>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export default Similar