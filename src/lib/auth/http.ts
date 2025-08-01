import axios from 'axios';
import { getTranslations } from 'next-intl/server';

const instance = axios.create({
    adapter: 'fetch',
    baseURL: process.env.API_URL,
    withCredentials: true,
})

instance.interceptors.response.use(async (response) => {
    const t = await getTranslations();
    if (response.data.status !== 200) return Promise.reject(t(`errors.${response.data.status ?? 'server'}`));
    return response?.data?.data;
}, async (error) => {
    const t = await getTranslations();
    const err = error?.response;
    return Promise.reject(t(`errors.${err.data.status ?? 'server'}`));
});

export default instance;