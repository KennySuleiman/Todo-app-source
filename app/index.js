const express = require("express");
const app = express();

app.use(express.json());

// in-memory "database"
let todos = [];

// health check
app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

// get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// add a todo
app.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    task: req.body.task,
    done: false
  };

  todos.push(todo);

  res.json({
    message: "Todo created",
    todo
  });
});

// update a todo (mark done/undone)
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.done = req.body.done ?? todo.done;

  res.json({
    message: "Todo updated",
    todo
  });
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  todos = todos.filter(t => t.id !== id);

  res.json({ message: "Todo deleted" });
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
