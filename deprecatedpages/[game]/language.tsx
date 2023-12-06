'use client'
import React from 'react'
import { Languages } from '../../deprecated/Languages'
import { ContextDtl } from '../../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import '../../src/app/globals.css'

export default function Language() {
	return (
		<ContextSear>
			{/* <ContextDtl> */}
			<Languages/>
			{/* </ContextDtl> */}
		</ContextSear>
	)
}




