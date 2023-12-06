/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import React, { Suspense, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LikesPage } from '../components/Client/LikesPage'
import { Footer } from '../components/Client/Footer'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import { getServerSession } from 'next-auth/next'
import { options } from './api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { Search } from '../components/Client/Search'
import { Likes } from '../components/Client/Likes'
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

// const Likes = (props: { session: Session | null }) => {
// 	if (props.session === null) {
// 		redirect('/signin')
// 	}

// 	return (
// 		<><main className={inter.className}>
// 			<Suspense fallback={<div>Loading...</div>}>
// 				<LikesPage />
// 			</Suspense>
// 		</main><Footer /></>
// 	)
// }


// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
// 	return {
// 		props: {
// 			session: await getServerSession(context.req, context.res, options)
// 		}
// 	}
// }
// export default Likes