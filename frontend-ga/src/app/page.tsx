'use client'
import React, { Suspense } from 'react'
import GameDtl from '../../components/GameDtl'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const App = () => {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<GameDtl/>
			</Suspense>
		</main>
	)
}

export default App


