'use client'
import React from 'react'
import '../../src/app/globals.css'
import { ContextDtl } from '../../src/app/gamecontext'
import { Websites } from '../../components/Websites'


export default function Website() {
	return (
		<ContextDtl>
			<Websites/>
		</ContextDtl>
	)
}




