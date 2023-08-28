'use client'
import React, { useEffect, useState, Suspense } from 'react'
// const GameDtl = React.lazy(() => import('../../components/GameDtl'))
import GameDtl from '../../components/GameDtl'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const App = () => {
	const [showChild, setShowChild] = useState(false)
	useEffect(() => {
		setShowChild(true)
	}, [])
	if (!showChild) {
		return null
	}
	if (typeof window === 'undefined') {
		return <></>
	}
	else {
		return (
			<main className={inter.className}>
				<Suspense fallback={<div>Loading...</div>}>
					<GameDtl/>
				</Suspense>
			</main>
		)
	}
}

export default App


