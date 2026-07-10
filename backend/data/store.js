//This is basically our definitions of our data and the use of that data based on the endpoit called
const PRIORITIES = ['low', 'medium', 'high'];

let tasks = [];
let nextId = 1;

function getAllTasks() {
    return tasks;
}

function getById(id) {
    return tasks.find((task) => task.id === id);
}

function createTask(title, description, priority) {
    const task = {
        id: nextId++,
        title,
        description,
        completed: false,
        createdAt: new Date(),
        priority,
    };
    tasks.push(task);
    return task;
}





//Fake data for testing purposes
function seedData() {
  const samples = [
    ['Set up project repository', 'Initialize git, add .gitignore and README scaffold.', 'high', true],
    ['Design the task data model', 'Agree on fields, types and validation rules.', 'medium', true],
    ['Build the REST API', 'Five endpoints with validation and error handling.', 'high', false],
    ['Implement the endless carousel', 'Cloned edges + transform, no external libraries.', 'high', false],
    ['Add filter controls', 'All / Completed / Pending, driven from a single state value.', 'medium', false],
    ['Write the task form', 'Shared component for create and edit flows.', 'medium', false],
    ['Handle loading and error states', 'Skeleton cards while fetching, banner on failure.', 'low', false],
    ['Make it responsive', 'One card on mobile, three on desktop.', 'medium', false],
    ['Polish priority badges', 'Colour-coded left border and pill badge.', 'low', false],
    ['Add delete confirmation', 'Small modal instead of window.confirm.', 'low', false],
    ['Test the full flow end to end', 'Create, edit, toggle, filter, delete.', 'high', false],
    ['Write the README', 'Setup, API docs, design decisions, time spent.', 'medium', false],
  ];
 
  samples.forEach(([title, description, priority, completed], index) => {
    const task = createTask(title, description, priority);
    task.completed = completed;
    task.createdAt = new Date(Date.now() - (samples.length - index) * 3600 * 1000);
  });
}

module.exports = { PRIORITIES, getAllTasks, getById, createTask, seedData};


