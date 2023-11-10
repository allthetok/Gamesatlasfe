'use client'
import React, { Suspense } from 'react'
import { IndGameList } from '../components/Client/IndGameList'
import { ExplorePage } from '../components/Client/ExplorePage'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Game() {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				{/* <IndGameList /> */}
				<ExplorePage />
			</Suspense>
		</main>
	)
}


