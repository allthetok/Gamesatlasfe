/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import './Profile.css'
import { Session } from 'next-auth'

type ProfileProps = {
	// userData: Session | null
	userData: any
}

const Profile = ({ userData }: ProfileProps) => {
	const data = useSession()
	const [loading, setLoading] = useState(true)
	console.log(data)

	useEffect(() => {
		if (data.status === 'authenticated') {
			setLoading(false)
		}
	}, [data])

	return (
		<div>
			{!loading ?
				<div className='profile-wrapper'>
					<div className='header-wrapper'>
						<div className='bg-wrapper'>
							<div className='bg-intro'></div>
						</div>
						<div className='intro-container'>
							{/* <div className='intro-wrapper'> */}
							<div className='intro-avatar'>
								<a><img className='intro-img' src={(userData?.data.user?.image !== undefined && userData?.data.user?.image !== null) ? userData.data.user.image : '/icons8-user-64.png'} alt='User Avatar'/></a>
							</div>
							<div className='intro-name'>
								<div className='name-container'>
									<span>{userData.data.user.name}</span>
								</div>
								<div className='id-container'>
									<span>GamesAtlas ID: {userData.data.user.id}</span>
									{userData.data.user.provider !== 'GamesAtlas' ? (
										<span>{userData.data.user.provider} ID: {userData.data.user.externalId}</span>
									): <></>}
								</div>
							</div>
							{/* </div> */}
						</div>

					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Profile }