/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { Suspense } from 'react'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

const Profile =  () => {
	const { data: session } = useSession()
	console.log(session)
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<div>
					{/* {session?.user?.email} */}
					hello
				</div>
			</Suspense>
		</main>
	)
}

export default Profile
