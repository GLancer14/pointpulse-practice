const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const tasks = require("../data/tasks");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    res.json(tasks.slice(query.startIndex, query.endIndex));
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("ID задачи не предоставлен");
    }

    const foundTask = tasks.find(task => task.id === id);
    if (!foundTask) {
      throw new Error("Такой задачи не существует");
    }

    res.json(foundTask);
  } catch(e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newTask = { id: uuid(), ...body };
    tasks.unshift(newTask);
    res.json(newTask);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const foundTask = tasks.findIndex(task => {
      if (id) {
        return task.id === id;
      }
    });
    if (foundTask === -1) {
      throw new Error("Такой задачи не существует");
    }

    const modifiedTask = {
      id: tasks[foundTask].id,
      title: body.title === "" || body.title === undefined
        ? tasks[foundTask].title
        : body.title,
      description: body.description === "" || body.description === undefined
        ? tasks[foundTask].description
        : body.description,
    };

    tasks[foundTask] = modifiedTask;
    res.json(modifiedTask);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundTask = tasks.findIndex(task => {
      return task.id === id;
    });
    if (foundTask === -1) {
      throw new Error("Такой задачи не существует");
    }

    res.json(tasks.splice(foundTask, 1)[0]);
  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;