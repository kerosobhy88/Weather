import axios from 'axios'


export const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })


api.interceptors.request.use((config) => {
console.log('Request:', config)
return config
})


api.interceptors.response.use((res) => res, (err) => Promise.reject(err))