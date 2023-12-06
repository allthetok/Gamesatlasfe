/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next/types'
import { Search } from '../components/Client/Search'
import { Recommend } from '../components/Client/Recommend'
import { Inter } from 'next/font/google'
import { Footer } from '../components/Client/Footer'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const Profile = () => {
	const router = useRouter()
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/signin')
		}
	})
	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<>
					<Search/>
					<Recommend user={session?.user}/>
				</>
			</Suspense>
		</main><Footer /></>
	)
}

export default Profile