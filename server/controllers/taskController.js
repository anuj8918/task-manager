const Task = require('../models/taskModel');

const getTasks = async (req, res) => {
    const { search, status, page = 1, limit = 10 } = req.query;
    
    const query = { user: req.user._id };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    if (status && status !== 'All') {
        query.status = status;
    }
    
    try {
        // Pagination logic 
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

const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = new Task({
        title,
        description,
        status,
        user: req.user._id, 
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
};

const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
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

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await task.deleteOne(); 
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };