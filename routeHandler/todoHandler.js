const express = require('express');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const { mongoose } = require('mongoose');

const Todo = new mongoose.model('Todo', todoSchema);

// get all todos
router.get('/', async(req, res) => {
    try {
        let data = await Todo.find({status: 'inactive'}).select ({
            _id: 0,
            _v: 0
        });
        res.status(200).json({
            result: data,
            message: 'Todos retrive successful.'
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server-side error'
        });
    }
});

// get a todo by id
router.get('/:id', async(req, res) => {
    try {
        let data = await Todo.findOne({_id: req.params.id});
        res.status(200).json({
            result: data,
            message: 'Todo retrive by Id successful.'
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server-side error'
        });
    }
});

// post todo
router.post('/', async(req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(200).json({
            message: 'Todo insert successful.'
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server-side error'
        });
    }
});

// post all todos
router.post('/all', async(req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'Multiple todo insert successful.'
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server-side error'
        });
    }
});

// update todo
router.put('/:id', async(req, res) => {
    try {
        let doc = await Todo.findByIdAndUpdate({_id: req.params.id}, {
            $set: {
                status: 'inactive'
            }
        });
        res.status(200).json({
            message: 'Todo updated successfully',
        });

        doc = await Todo.findOne({_id: req.params.id});
        console.log('updated data ', doc);
    } catch (err) {
        res.status(500).json({
            error: 'There was a server-side error'
        });
    }
});

// delete todo
router.delete('/:id', async(req, res) => {
    try {
        await Todo.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Todo delete successful.'
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server-side error'
        });
    }
});

module.exports = router;