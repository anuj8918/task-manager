// src/api/index.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Request se pehle token ko headers me add karna
API.interceptors.request.use((req) => {
    const user = localStorage.getItem('user');
    if (user) {
        const token = JSON.parse(user).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;