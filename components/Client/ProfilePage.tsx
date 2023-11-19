import React from 'react'
import { Search } from './Search'
import { Profile } from './Profile'
import { Session } from 'next-auth'

type ProfilePageProps = {
	// userData: Session | null
	userData: any
}

const ProfilePage = ({ userData }: ProfilePageProps) => {
	return (
		<>
			<Search/>
			<Profile userData={userData}/>
		</>
	)
}

export { ProfilePage }