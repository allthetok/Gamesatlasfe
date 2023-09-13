'use client'
import React, { Suspense, useContext } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const App = () => {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				Homepage
			</Suspense>
		</main>
	)
}

export default App


