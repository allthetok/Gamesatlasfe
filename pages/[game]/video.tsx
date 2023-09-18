'use client'
import React from 'react'
import { VideoList } from '../../components/VideoList'
import '../../src/app/globals.css'
import { ContextDtl } from '../../src/app/gamecontext'



export default function Video() {
	return (
		<ContextDtl>
			<VideoList/>
		</ContextDtl>
	)
}




