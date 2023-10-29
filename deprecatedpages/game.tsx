'use client'
import React, { Suspense } from 'react'
import GameDtl from '../components/GameDtl'
import { ContextDtl } from '../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Game() {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<ContextSear>
					{/* <ContextDtl> */}
					<GameDtl/>
					{/* </ContextDtl> */}
				</ContextSear>
			</Suspense>
		</main>
	)
}
// import React  from 'react'
// import GameDtl from '../components/GameDtl'
// import { Inter } from 'next/font/google'
// import '../src/app/globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export default function Game() {
// 	return (
// 		<main className={inter.className}>
// 			<GameDtl/>
// 		</main>
// 	)
//