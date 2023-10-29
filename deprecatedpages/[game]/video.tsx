'use client'
import React from 'react'
import { VideoList } from '../../components/Client/VideoList'
import { ContextDtl } from '../../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import '../../src/app/globals.css'



export default function Video() {
	return (
		<ContextSear>
			{/* <ContextDtl> */}
			<VideoList/>
			{/* </ContextDtl> */}
		</ContextSear>
	)
}




