'use client'
import React, { Suspense } from 'react'
import { Forgot } from '../components/Client/Forgot'
import { Inter } from 'next/font/google'
import { Footer } from '../components/Client/Footer'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function ResetPass() {
	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<Forgot />
			</Suspense>
		</main><Footer /></>

	)
}


