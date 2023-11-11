'use client'
import React, { Suspense } from 'react'
import { Search } from '../components/Client/Search'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<Search/>
			</Suspense>
		</main>
	)
}

export default Home

