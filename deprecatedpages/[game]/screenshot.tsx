'use client'
import React from 'react'
import { Screenshots } from '../../components/Client/Screenshots'
import { ContextDtl } from '../../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import '../../src/app/globals.css'


export default function Screenshot() {
	return (
		<ContextSear>
			{/* <ContextDtl> */}
			<Screenshots/>
			{/* </ContextDtl> */}
		</ContextSear>
	)
}




