'use client'
import React from 'react'
import { Artworks } from '../../deprecated/Artworks'
import { ContextDtl } from '../../src/app/gamecontext'
import { ContextSear } from '@/app/searchcontext'
import '../../src/app/globals.css'


export default function Artwork() {
	return (
		<div>
			<ContextSear>
				{/* <ContextDtl> */}
				<Artworks/>
				{/* </ContextDtl> */}
			</ContextSear>
		</div>
	)
}




