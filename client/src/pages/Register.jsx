import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const registerPromise = API.post('/auth/register', formData);

        toast.promise(registerPromise, {
            loading: 'Registering...',
            success: (data) => {
                navigate('/login');
                return <b>Registration successful! You can now log in.</b>;
            },
            error: (err) => {
                const errorMessage = err.response?.data?.message || 'Registration failed';
                setError(errorMessage);
                return <b>{errorMessage}</b>;
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-400">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    {/* {error && <p className="text-sm text-red-400">{error}</p>}? */}
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};
export default Register;
