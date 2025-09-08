import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

// A wrapper for routes that need authentication
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Show a loading indicator while checking for authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    // If not loading, redirect to login if there's no user, otherwise show the page
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private route */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
