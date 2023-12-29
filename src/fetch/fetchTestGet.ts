// import axios from 'axios'
// import { ListBySearchAPIResponse } from './APIResponsesTypes'
// import { QueryFunction } from '@tanstack/react-query'

// const fetchTestGet: QueryFunction<string> = async ({ queryKey }) => {
//   const { category, items, page } = queryKey[1]

//   try {
//     // 카테고리가 있으면 카테고리 키워드가 있으면 키워드
//     let apiRes

//     if (category) {
//       apiRes = await axios.get(
//         // `https://jsonplaceholder.typicode.com/comments?_limit=${items}&_page=${page}`,
//         `http://kdt-sw-7-team06.elicecoding.com:3000/top-categorys/${category}`,
//       )
//     } else {
//       apiRes = await axios.get(
//         // `https://jsonplaceholder.typicode.com/comments?_limit=${items}&_page=${page}`,
//         `http://kdt-sw-7-team06.elicecoding.com:3000/recipes`,
//       )
//     }

//     return apiRes.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default fetchTestGet
