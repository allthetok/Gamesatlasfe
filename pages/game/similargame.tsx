'use client'
import React from 'react'
import { Similar } from '../../components/Similar'
import { response } from '../../mockdata/response'
import '../../src/app/globals.css'

export default function SimilarGame() {
	return (
		<Similar response={response} />
	)
}




