import axios from "axios";

const instance = axios.create({
    adapter: 'fetch',
    baseURL: process.env.API_URL,
    withCredentials: true,
});

instance.interceptors.response.use(async (response) => {
    if (response.data.status !== 200) return Promise.reject(response.data.msg);
    return response?.data.data;
}, async (error) => {
    const err = error?.response;
    return Promise.reject(err.data.message);
});


export default instance;