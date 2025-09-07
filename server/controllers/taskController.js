// controllers/taskController.js
const Task = require('../models/taskModel');

// @desc    Get logged in user's tasks with search, filter, and pagination
// @route   GET /api/tasks
const getTasks = async (req, res) => {
    const { search, status, page = 1, limit = 10 } = req.query;
    
    // Query sirf logged-in user ke tasks ke liye [cite: 11]
    const query = { user: req.user._id };

    // Search filter [cite: 17, 19]
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    // Status filter [cite: 18, 19]
    if (status && status !== 'All') {
        query.status = status;
    }
    
    try {
        // Pagination logic [cite: 20]
        const tasks = await Task.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Task.countDocuments(query);

        res.json({
            tasks,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new task [cite: 14]
// @route   POST /api/tasks
const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = new Task({
        title,
        description,
        status,
        user: req.user._id, // task ko user se link karna
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
};

// @desc    Update a task [cite: 14]
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
        // Check karna ki task usi user ka hai jo update kar raha hai [cite: 15]
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Delete a task [cite: 14]
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        // Check karna ki task usi user ka hai jo delete kar raha hai [cite: 15]
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await task.deleteOne(); // Use deleteOne() instead of remove()
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };