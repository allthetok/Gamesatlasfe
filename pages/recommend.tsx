/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'
import React, { Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next/types'
import { RecommendPage } from '../components/Client/RecommendPage'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { Footer } from '../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

const Profile = () => {
	const data = useSession()
	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<RecommendPage userData={data} />
			</Suspense>
		</main><Footer /></>
	)
}

export default Profile