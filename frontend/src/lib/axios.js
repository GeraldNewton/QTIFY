import axios from "axios"

export const axiosInstance=axios.create({
    baseURL:"https://qtify-backend2.onrender.com/api",
    withCredentials: true 
})