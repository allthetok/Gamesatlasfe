import { useSession } from 'next-auth/react'
import React from 'react'
import { useLikes } from '../../hooks/useLikes'

const Likes = () => {
	const data = useSession()
	// console.log(typeof data.data?.user.id)
	// console.log(data.data?.user.id)

	const { likeDataFetch, error, loading } = useLikes(data.data?.user.id)
	console.log(likeDataFetch)
	return (
		<div>
			welcome to likes page.
		</div>
	)
}

export { Likes }