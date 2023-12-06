'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { Search } from '../components/Client/Search'
import { Likes } from '../components/Client/Likes'
import { Footer } from '../components/Client/Footer'
import '../src/app/globals.css'
import '../components/Client/Advanced.css'
import '../components/Client/IndGameList.css'


const inter = Inter({ subsets: ['latin'] })

const Like = () => {
	const router = useRouter()
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/signin')
		}
	})

	return (
		<><main className={inter.className}>
			<Suspense fallback={<div>Loading...</div>}>
				<>
					<Search/>
					<div className='explore-wrap'>
						<div>
							<Likes user={session?.user} />
						</div>
					</div>
				</>
			</Suspense>
		</main><Footer /></>

	)
}

export default Like