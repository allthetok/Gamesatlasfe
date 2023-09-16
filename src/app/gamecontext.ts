import { createContext } from 'react'
import axios from 'axios'
import { response } from '../../mockdata/response'
import { useSearch } from '../../hooks/useSearch'

// const GameContext = createContext(response)
// const getResponseObj = async (searchTerm: string) => {
// 	const searchConfig = {
// 		method: 'post',
// 		url: 'http://localhost:3001/api/gamedetails',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		data : {
// 			searchterm: 'witcher'
// 		}
// 	}

// 	await axios(searchConfig)
// 		.then((res) => {
// 			console.log(res.data)
// 		})
// 		.catch((err) => {
// 			console.log(err)
// 		})
// 	return response
const GameContext = createContext(() => {
	const [dataFetch, error, loading] = useSearch({ gameSearch: 'sekiro' })
	return [dataFetch, error, loading]

})

// const GameContext = createContext(getResponseObj('sekiro'))



export { GameContext }