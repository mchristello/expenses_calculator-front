import axios from 'axios';


export const connectAPI = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api`
    
})

export const connectBack = axios.create({
    baseURL: `${process.env.BACKEND_URL}`
})

export const connectNextURL = axios.create({
    baseURL: `${process.env.NEXT_API_URL || ""}/api`
})