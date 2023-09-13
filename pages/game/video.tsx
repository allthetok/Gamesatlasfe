'use client'
import React from 'react'
import { VideoList } from '../../componentsalt/VideoList'
import { response } from '../../mockdata/response'
import '../../src/app/globals.css'


export default function Video() {
	return (
		<VideoList response={response} />
	)
}




