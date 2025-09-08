import React, { useState, useEffect } from 'react';
import API from '../api';
import TaskModal from '../components/TaskModal';
import { FaChevronLeft, FaChevronRight, FaPlus, FaSearch, FaChevronDown, FaRegClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        toast.success(<b>Task deleted!</b>);
        fetchTasks();
      } catch (error) {
        toast.error(<b>Failed to delete task.</b>);
        console.error('Failed to delete task', error);
      }
    }
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      
      <main className="md:container max-md:max-w-[90%] mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 "> 
        <section className="mb-6 sm:mb-8  max-sm:max-w-[90%] max-sm:m-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 md:mb-0">Your Tasks</h2>
            <button onClick={openModalForCreate} className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 font-bold text-sm sm:text-base text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg flex items-center justify-center space-x-2">
              <FaPlus />
              <span>Add New Task</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6 sm:mb-8">
            <div className="relative w-full md:w-2/3">
              <input 
                type="text" 
                placeholder="Search by title or description..." 
                className="w-full px-5 py-3 pr-10 bg-white text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base" 
                value={search} 
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); 
                }}
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            </div>
            <div className="relative w-full md:w-1/3">
              <select 
                className="w-full px-5 py-3 bg-white text-gray-800 border border-gray-300 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" 
                value={status} 
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All" className="bg-white">All Status</option>
                <option value="pending" className="bg-white">Pending</option>
                <option value="done" className="bg-white">Done</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm sm:text-base" />
            </div>
          </div>
        </section>

        <section className="sm:grid gap-4 sm:gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {tasks.length > 0 ? tasks.map((task) => (
            <div key={task._id} className="p-4 sm:p-5 max-sm:max-w-[90%] max-sm:m-auto max-sm:mb-4 bg-white rounded-xl shadow-md border border-gray-200 hover:border-blue-500 transition duration-300 transform hover:scale-[1.02] h-48"> {/* Adjusted card padding */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{task.title}</h3>
                <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${task.status === 'done' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                  {task.status}
                </span>
              </div>
              <p className="mt-4 text-gray-600 text-sm overflow-hidden text-ellipsis">{task.description}</p>
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <FaRegClock />
                  <span>Created: {formatDate(task.createdAt)}</span>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => openModalForEdit(task)} className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-500">No tasks found. Click 'Add New Task' to create one!</p>
            </div>
          )}
        </section>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 sm:mt-10 space-x-2 sm:space-x-4">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`p-2 sm:p-3 rounded-full ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-gray-200 transition duration-300'}`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm sm:text-lg font-semibold text-gray-600">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className={`p-2 sm:p-3 rounded-full ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-gray-200 transition duration-300'}`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </main>
      
      {isModalOpen && <TaskModal task={currentTask} onClose={() => setIsModalOpen(false)} refreshTasks={fetchTasks} />}
        {/* <Footer/> */}
    </div>
  );
};

export default Dashboard;