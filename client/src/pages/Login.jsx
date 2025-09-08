import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const loginPromise = API.post('/auth/login', formData);
        
        toast.promise(loginPromise, {
            loading: 'Logging in...',
            success: (data) => {
                login(data.data);
                navigate('/');
                return <b>Logged in successfully!</b>;
            },
            error: (err) => {
                const errorMessage = err.response?.data?.message || 'Login failed';
                setError(errorMessage);
                return <b>{errorMessage}</b>;
            }
        });
    };
    
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-blue-600">Welcome Back!</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
                            Login
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-500">
                        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Login;