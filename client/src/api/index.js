import axios from 'axios';

const API = axios.create({ baseURL: 'https://task-manager-4q5x.onrender.com/api' });

// Before request add token in headers
API.interceptors.request.use((req) => {
    const user = localStorage.getItem('user');
    if (user) {
        const token = JSON.parse(user).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;