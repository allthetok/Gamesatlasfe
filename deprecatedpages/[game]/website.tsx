'use client'
import React from 'react'
import { Websites } from '../../components/Websites'
import { ContextDtl } from '../../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import '../../src/app/globals.css'

export default function Website() {
	return (
		<ContextSear>
			{/* <ContextDtl> */}
			<Websites/>
			{/* </ContextDtl> */}
		</ContextSear>

	)
}




