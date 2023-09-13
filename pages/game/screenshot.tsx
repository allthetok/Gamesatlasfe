'use client'
import React from 'react'
import { Screenshots } from '../../componentsalt/Screenshots'
import { response } from '../../mockdata/response'
import '../../src/app/globals.css'

export default function Screenshot() {
	return (
		<Screenshots response={response} />
	)
}




