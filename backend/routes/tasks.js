const express = require('express');
const store = require('../data/store');
const { notFoundError } = require('../middleware/errorHandler');
const { validateId, validateTaskBody } = require('../middleware/validations');


const router = express.Router();

const missingId = (id) => notFoundError(`Task with id ${id} not found`);

// Where we define all of the routes and what they do

// GET /api/tasks
router.get('/', (req, res) => {
    res.json(store.getAllTasks());
});

// POST /api/tasks
router.post('/', validateTaskBody, (req, res) => {
     const task = store.createTask(req.body.title, req.body.description, req.body.priority);
     res.status(201).location(`/api/tasks/${task.id}`).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', validateId, validateTaskBody, (req, res) => {
    const task = store.updateTask(req.taskId, req.body);
    if (!task) {
        return res.status(404).json({ error: `Task with id ${req.taskId} not found` });
    }
    res.json(task);
});



module.exports = router;


