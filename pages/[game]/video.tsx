'use client'
import React from 'react'
import { VideoList } from '../../components/VideoList'
import { ContextDtl } from '../../src/app/gamecontext'
import '../../src/app/globals.css'



export default function Video() {
	return (
		<ContextDtl>
			<VideoList/>
		</ContextDtl>
	)
}




