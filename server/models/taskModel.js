// models/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { // Task ko user se link karne ke liye
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: { // Task ka title [cite: 13]
        type: String,
        required: true,
        trim: true,
    },
    description: { // Task ka description [cite: 13]
        type: String,
        required: true,
    },
    status: { // Task ka status [cite: 13]
        type: String,
        required: true,
        enum: ['pending', 'done'],
        default: 'pending',
    },
    createdAt: { // Task kab create hua [cite: 13]
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;