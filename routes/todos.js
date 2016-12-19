const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://ibrahim:ibrahim@ds139438.mlab.com:39438/todos', ['todos']);

//Get Todos
router.get('/todos', function(req, res, next){
  //res.send('TODOS API');
  db.todos.find(function(error, todos) {
    if(error){
      res.send(error);
    } else{
      res.json(todos);
    }
  })
});

//Get a single todo
router.get('/todo/:id', function(req, res, next){
  //res.send('TODOS API');
  db.todos.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(error, todo) {
    if(error){
      res.send(error);
    } else{
      res.json(todo);
    }
  })
});

//Posting a new todo
router.post('/todo', function(req, res){
  var todo = req.body;
  if(!todo.text || !(todo.isCompleted)){
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else{
      db.save(todo, function(error, result) {
        if(error){
          res.send(error);
        } else {
          res.json(result);
        }
      });
  }
});

//Updating a todo
router.put('/todo/:id', function(req, res){
  var todo = req.body;
  var updatedObject = {};
  if(todo.isCompleted){
    updatedObject.isCompleted = todo.isCompleted;
  }
  if(todo.text){
    updatedObject.text = todo.text;
  }

  if(!updatedObject){
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.todos.update({
      _id: mongojs.ObjectId(req.params.ObjectId)
    }, updatedObject, {}, function(error, result) {
      if(error){
        res.send(error);
      } else {
        res.json(result);
      }
    });
  }
});

//Deleting a todo
router.delete('/todo/:id', function(req, res){
    db.todos.delete({
      _id: mongojs.ObjectId(req.params.ObjectId)
    }, '', {}, function(error, result) {
      if(error){
        res.send(error);
      } else {
        res.json(result);
      }
    });
});


module.exports = router;
