'use client'
import React from 'react'
import { Languages } from '../../components/Languages'
import { ContextDtl } from '../../src/app/gamecontext'
import '../../src/app/globals.css'

export default function Language() {
	return (
		<ContextDtl>
			<Languages/>
		</ContextDtl>
	)
}




