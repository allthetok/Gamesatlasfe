'use client'
import React, { Suspense } from 'react'
import { Login } from '../components/Client/Login'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { Footer } from '../components/Client/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function SignInPage() {
	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<Login />
			</Suspense>
		</main><Footer /></>

	)
}


