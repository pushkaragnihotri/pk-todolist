const mongoose = require('mongoose');
const Todo = mongoose.model('todos');

module.exports = app => {
    // Fetch all todos
    app.get('/api/todos', async (req, res) => {
        const todos = await Todo.find().sort([['createdAt', -1]]);

        res.send(todos);
    });

    // Create a new todo
    app.post('/api/todos', async (req, res) => {
        const { name } = req.body;
        const todo = new Todo({ name, createdAt: Date.now() });
        await todo.save();

        res.send(todo);
    });

    // Fetch a todo with given id
    app.get('/api/todos/:id', async (req, res) => {
        const todo = await Todo.findById(req.params.id);

        res.send(todo);
    });

    // Toggle a todo with given id
    app.put('/api/todos/:id', async (req, res) => {
        const todoRef = await Todo.findById(req.params.id);
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { done: !todoRef.done }
        );
        await todo.save();

        res.send(todo);
    });

    // Update a todo with given id
    app.put('/api/todos/:id/edit', async (req, res) => {
        const { name } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { name }
        );
        await todo.save();

        res.send(todo);
    });

    // Delete a todo with given id
    app.delete('/api/todos/:id', async (req, res) => {
        const id = req.params.id;
        const todo = await Todo.findByIdAndDelete(id);

        res.send(todo);
    });
};
