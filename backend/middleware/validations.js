
const { PRIORITIES } = require('../data/store');
function validateTaskBody(req, res, next) {
    const {title, description, priority} = req.body;
    const validationDetails = [];

    if (!title || typeof title !== 'string' || title.trim() === '') {
        validationDetails.push('Title is required and must be a non-empty string.');
    }

    if (description && typeof description !== 'string') {
        validationDetails.push('Description must be a string.');
    }

    if (priority && !PRIORITIES.includes(priority)) {
        validationDetails.push('Invalid priority. Must be one of: low, medium, high.');
    }

    if (validationDetails.length > 0) {
        return res.status(400).json({ errors: validationDetails });
    }

    next();
}

function validateId(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid ID. Must be an integer.' });
    }
    req.taskId = id;
    next();
}

module.exports = { validateTaskBody, validateId };
