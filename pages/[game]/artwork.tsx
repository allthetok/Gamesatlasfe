'use client'
import React from 'react'
import { Artworks } from '../../components/Artworks'
import { ContextDtl } from '../../src/app/gamecontext'
import '../../src/app/globals.css'


export default function Artwork() {
	return (
		<div>
			<ContextDtl>
				<Artworks/>
			</ContextDtl>
		</div>
	)
}




