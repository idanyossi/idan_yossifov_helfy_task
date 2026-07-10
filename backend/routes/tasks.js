const express = require('express');
const store = require('../data/store');
const { validateId, validateTaskBody } = require('../middleware/validations');


const router = express.Router();

const missingId = (id) => notFoundError(`Task with id ${id} not found`);

// Where we define all of the routes and what they do

// Helper route for testing purposes using the getById function from the store
// GET /api/tasks/:id
router.get('/:id', validateId, (req, res) => {
    const task = store.getById(req.taskId);
    if (!task) {
        return res.status(404).json({ error: `Task with id ${req.taskId} not found` });
    }
    res.json(task);
});

// Actual Endpoints per the required specification

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

// DELETE /api/tasks/:id
router.delete('/:id', validateId, (req, res) => {
    const deleted = store.deleteTask(req.taskId);
    if (!deleted) {
        return res.status(404).json({ error: `Task with id ${req.taskId} not found` });
    }
    res.status(204).send();
});

// PATCH /api/tasks/:id/toggle
router.patch('/:id/toggle', validateId, (req, res) => {
    const task = store.toggleTaskCompletion(req.taskId);
    if (!task) {
        return res.status(404).json({ error: `Task with id ${req.taskId} not found` });
    }
    res.json(task);
});


module.exports = router;


