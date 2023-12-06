'use client'
import React from 'react'
import { Similar } from '../../deprecated/Similar'
import { ContextDtl } from '../../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import '../../src/app/globals.css'


export default function SimilarGame() {
	return (
		<ContextSear>
			{/* <ContextDtl> */}
			<Similar/>
			{/* </ContextDtl> */}
		</ContextSear>
	)
}




