import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TaskModal from '../components/TaskModal';
import { FaChevronLeft, FaChevronRight, FaPlus, FaSearch, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks?search=${search}&status=${status}&page=${currentPage}&limit=6`);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status, currentPage]);

  const handleLogout = () => {
    toast.success("logged out successfully!");
    logout();
    navigate('/login');
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <p className="text-sm font-semibold">Are you sure you want to delete this task?</p>
        <div className="flex mt-2 space-x-2">
          <button
            className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
            onClick={async () => {
              toast.dismiss(t.id);
              const deletePromise = API.delete(`/tasks/${id}`);
              toast.promise(deletePromise, {
                loading: 'Deleting task...',
                success: <b>Task deleted!</b>,
                error: <b>Failed to delete task.</b>,
              });
              await deletePromise;
              fetchTasks();
            }}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 text-sm font-bold text-gray-800 bg-gray-300 rounded-full hover:bg-gray-400"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: '#333',
        color: '#fff',
      }
    });
  };

  const openModalForCreate = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="p-5 bg-gray-800 shadow-lg flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wider">Task Manager</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-300 hidden md:inline">Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="px-5 py-2 font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition duration-300 shadow-md">
            Logout
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-8">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-gray-200 mb-4 md:mb-0">Your Tasks</h2>
            <button onClick={openModalForCreate} className="px-6 py-3 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg flex items-center space-x-2">
              <FaPlus />
              <span>Add New Task</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative w-full md:w-2/3">
              <input 
                type="text" 
                placeholder="Search by title or description..." 
                className="w-full px-5 py-3 pr-10 bg-gray-800 text-gray-200 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                value={search} 
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); 
                }}
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative w-full md:w-1/3">
              <select 
                className="w-full px-5 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={status} 
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All" className="bg-gray-800">All Status</option>
                <option value="pending" className="bg-gray-800">Pending</option>
                <option value="done" className="bg-gray-800">Done</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.length > 0 ? tasks.map((task) => (
            <div key={task._id} className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition duration-300 transform hover:scale-[1.02]">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-blue-400 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{task.title}</h3>
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${task.status === 'done' ? 'bg-green-500 text-green-900' : 'bg-yellow-500 text-yellow-900'}`}>
                  {task.status}
                </span>
              </div>
              <p className="mt-3 text-gray-400 text-sm overflow-hidden text-ellipsis">{task.description}</p>
              <div className="flex justify-end mt-5 space-x-3">
                <button onClick={() => openModalForEdit(task)} className="px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-full hover:bg-yellow-700 transition duration-300">
                  Edit
                </button>
                <button onClick={() => handleDelete(task._id)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-400">No tasks found. Click 'Add New Task' to create one!</p>
            </div>
          )}
        </section>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`p-3 rounded-full ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-blue-400 hover:bg-gray-700 transition duration-300'}`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-lg font-semibold text-gray-300">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className={`p-3 rounded-full ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-blue-400 hover:bg-gray-700 transition duration-300'}`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </main>
      
      {isModalOpen && <TaskModal task={currentTask} onClose={() => setIsModalOpen(false)} refreshTasks={fetchTasks} />}
    </div>
  );
};

export default Dashboard;
