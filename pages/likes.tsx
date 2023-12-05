'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LikesPage } from '../components/Client/LikesPage'
import { Footer } from '../components/Client/Footer'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Game() {
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
				<LikesPage />
			</Suspense>
		</main><Footer /></>

	)
}