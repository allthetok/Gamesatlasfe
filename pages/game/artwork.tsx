'use client'
import React from 'react'
import { Artworks } from '../../componentsalt/Artworks'
import '../../src/app/globals.css'
import { response } from '../../mockdata/response'

export default function Artwork() {
	return (
		<div>
			<Artworks response={response}/>
		</div>
	)
}



