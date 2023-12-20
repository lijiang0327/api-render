import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/',
});

// usually we inject the token in this interceptor
instance.interceptors.request.use((config) => {
  return config;
});

// we handle response errors in this context
instance.interceptors.response.use((response) => {
  return response;
});

export default instance;
