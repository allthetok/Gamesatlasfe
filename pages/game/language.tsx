'use client'
import React from 'react'
import { Languages } from '../../components/Languages'
import { response } from '../../mockdata/response'
import '../../src/app/globals.css'

export default function Language() {
	return (
		<Languages response={response}/>
	)
}




