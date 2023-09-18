'use client'
import React, { Suspense, useContext } from 'react'
import { Search } from '../../components/Search'
import { ContextDtl } from '../../src/app/gamecontext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const App = () => {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<ContextDtl>
					<Search/>
				</ContextDtl>
			</Suspense>
		</main>
	)
}

export default App


