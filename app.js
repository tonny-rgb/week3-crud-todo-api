const express = require("express");
const app = express();

app.use(express.json());

let todos = [];
let idCounter = 1;

//CREATE
app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      error: "Task field is required"
    });
  }

  const newTodo = {
    id: idCounter++,
    task: task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//READ ALL
app.get("/todos", (req, res) => {
  res.json(todos);
});

//GET ONE
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json(todo);
});

//UPDATE
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  const { task, completed } = req.body;

  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

//DELETE
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter(t => t.completed === false);
  res.json(activeTodos);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

