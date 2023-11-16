import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../../pages/api/auth/[...nextauth]'

const Profile = async () => {

	// const session = await getServerSession(options)
	// console.log(session)
	return (
		<div>
			{/* {session?.user?.email} */}
			hello
		</div>
	)
}

export { Profile }