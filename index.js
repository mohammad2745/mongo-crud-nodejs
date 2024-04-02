const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

// express app intialization
const app = express();
app.use(express.json());

// database conncetion with mongoose
mongoose.connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('connection successful');
})
.catch(err => console.log(err));

// application routes
app.use('/todo', todoHandler);

// default error handler
errorHandler = (err, req, res, next) => {
    if(res.headersSend) {
        return next(err);
    }
    res.status(500).json({error: err});
}

app.listen(3000, () => {
    console.log('app listening at port 3000');
})