import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
            <div className="w-full max-w-lg p-6 bg-gray-800 text-gray-200 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">{task ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Title</label>
                        <input
                            type="text" name="title" required
                            value={formData.title} onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Description</label>
                        <textarea
                            name="description" required rows="4"
                            value={formData.description} onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Status</label>
                        <select
                            name="status" value={formData.status} onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <option value="pending" className="bg-gray-800">Pending</option>
                            <option value="done" className="bg-gray-800">Done</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
