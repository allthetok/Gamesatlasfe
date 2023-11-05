'use client'
import React, { Suspense } from 'react'
import { Advanced } from '../components/Client/Advanced'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Game() {
	return (
		<main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<Advanced />
			</Suspense>
		</main>
	)
}


