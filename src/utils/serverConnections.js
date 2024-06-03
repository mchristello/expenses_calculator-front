import axios from 'axios';


export const connectAPI = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api`
})

export const connectBack = () => {
    const env = process.env.PERSISTENCE;
    const baseURL = env === 'PRODUCTION' 
        ? `${process.env.BACKEND_URL_PRODUCTION}` 
        : `${process.env.BACKEND_URL}`;


    return axios.create({
        baseURL: baseURL
    })
}

export const connectNextURL = axios.create({
    baseURL: `${process.env.NEXT_API_URL || ""}/api`
})


export const api = connectBack();