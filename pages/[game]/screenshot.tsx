'use client'
import React from 'react'
import { Screenshots } from '../../components/Screenshots'
import { ContextDtl } from '../../src/app/gamecontext'
import '../../src/app/globals.css'


export default function Screenshot() {
	return (
		<ContextDtl>
			<Screenshots/>
		</ContextDtl>
	)
}




