'use client'
import React, { Suspense } from 'react'
import { AdvancedPage } from '../components/Client/AdvancedPage'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { Footer } from '../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Game() {
	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<AdvancedPage />
			</Suspense>
		</main><Footer /></>

	)
}


