const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// load Idea Model
require('../models/Todo');
// load model into a variable
const Todo = mongoose.model('todo');

// ! all todos
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => {
      res.render('allTodos', {
        todos,
      });
    })
    .catch((e) => console.error(e));
});

// ! Page displayed when u want to add
router.get('/add', (req, res) => {
  res.render('add');
});

// ! the path that enables us to modify stuff
router.get('/edit/:id', (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .lean()
    .then((todo) => {
      console.log(todo);
      res
        .render('editTodo', {
          todo,
        })
        .catch((e) => console.error(e));
    });
  console.log(req.params, 'I am from the get :/id route');
});

// ! edit form takes a route param(to map to a given object)
router.put('/:id', (req, res) => {
  Todo.findOne({
    _id: req.params.id,
  }).then((todo) => {
    // new values
    todo.title = req.body.title;
    todo.description = req.body.description;

    todo
      .save()
      .then((todo) => {
        res.redirect('/todos');
      })
      .catch((e) => console.trace(e));
  });
});



// ! Adding a new todo
router.post('/add', (req, res) => {
  // console.log(req.body);
  const newTodo = {
    title: req.body.title,
    description: req.body.description,
  };

  new Todo(newTodo).save().then((todo) => res.redirect('/todos'));

  console.log(newTodo);
});

// ! Deleting a todo
router.delete('/:id', (req, res) => {
  // the remove gets it off the database
  Todo.remove({ _id: req.params.id })
    .then(() => res.redirect('/todos'))
    .catch((e) => console.error(e));
  // res.send("deleted");
});

module.exports = router;
