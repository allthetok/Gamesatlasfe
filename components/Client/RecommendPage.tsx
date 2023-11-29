import React from 'react'
import { Search } from './Search'
import { Recommend } from './Recommend'
import { Session } from 'next-auth'

type RecommendPageProps = {
	// userData: Session | null
	userData: any
}

const RecommendPage = ({ userData }: RecommendPageProps) => {
	return (
		<>
			<Search/>
			<Recommend userData={userData}/>
		</>
	)
}

export { RecommendPage }