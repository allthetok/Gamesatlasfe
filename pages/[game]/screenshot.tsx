'use client'
import React from 'react'
import { Screenshots } from '../../components/Screenshots'
import '../../src/app/globals.css'
import { ContextDtl } from '../../src/app/gamecontext'


export default function Screenshot() {
	return (
		<ContextDtl>
			<Screenshots/>
		</ContextDtl>
	)
}




