'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { Search } from '../components/Client/Search'
import { Profile } from '../components/Client/Profile'
import { Footer } from '../components/Client/Footer'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const Prof = () => {
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
					<Profile user={session?.user}/>
				</>
			</Suspense>
		</main><Footer /></>

	)
}

export default Prof
