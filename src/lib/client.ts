import axios from "axios";

const instance = axios.create({
    adapter: 'fetch',
    baseURL: process.env.API_URL,
    withCredentials: true,
});

instance.interceptors.response.use(async (response) => {
    if (response.status !== 200) return Promise.reject(response.data.message);
    return response?.data;
}, async (error) => {
    const err = error?.response;
    return Promise.reject(err.data.message);
});


export default instance;