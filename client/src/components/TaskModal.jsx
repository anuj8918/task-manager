import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import { FaChevronDown } from 'react-icons/fa';

const TaskModal = ({ task, onClose, refreshTasks }) => {
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });

    useEffect(() => {
        if (task) {
            setFormData({ title: task.title, description: task.description, status: task.status });
        } else {
            setFormData({ title: '', description: '', status: 'pending' });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let promise;
            if (task) {
                promise = API.put(`/tasks/${task._id}`, formData);
                await toast.promise(promise, {
                    loading: 'Updating task...',
                    success: <b>Task updated successfully!</b>,
                    error: <b>Failed to update task.</b>,
                });
            } else {
                promise = API.post('/tasks', formData);
                await toast.promise(promise, {
                    loading: 'Creating task...',
                    success: <b>Task created successfully!</b>,
                    error: <b>Failed to create task.</b>,
                });
            }
            refreshTasks();
            onClose();
        } catch (error) {
            console.error('Failed to save task', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
            <div className="w-full max-w-lg p-6 bg-white text-gray-800 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-blue-500">{task ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text" name="title" required
                            value={formData.title} onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description" required rows="4"
                            value={formData.description} onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <div className="relative">
                            <select
                                name="status" value={formData.status} onChange={handleChange}
                                className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="pending" className="bg-white">Pending</option>
                                <option value="done" className="bg-white">Done</option>
                            </select>
                            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300">
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;