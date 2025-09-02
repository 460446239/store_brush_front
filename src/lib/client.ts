import axios from "axios";

const instance = axios.create({
    adapter: 'fetch',
    withCredentials: true,
});

instance.interceptors.response.use(async (response) => {
    return response?.data.data;
}, async (error) => {
    const err = error?.response;
    return Promise.reject(err.data.msg);
});


export default instance;