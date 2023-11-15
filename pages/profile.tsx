/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { Suspense } from 'react'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]'

const inter = Inter({ subsets: ['latin'] })

export default async function Profile() {
	const session = await getServerSession()
	console.log(session)
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<div>
					{session?.user?.email}
				</div>
			</Suspense>
		</main>
	)
}


