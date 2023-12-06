'use client'
import React, { Suspense } from 'react'
import { Signup } from '../components/Client/Signup'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { Footer } from '../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<Signup />
			</Suspense>
		</main><Footer /></>

	)
}


