'use client'
import React from 'react'
import '../../src/app/globals.css'
import { response } from '../../mockdata/response'
import { Websites } from '../../componentsalt/Websites'


export default function Website() {
	return (
		<Websites response={response}/>
	)
}




