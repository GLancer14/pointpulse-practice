const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const tasks = require("../data/tasks");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    res.json({
      data: tasks.slice(query.startIndex, query.endIndex),
      status: "ok",
    });
  } catch(e) {
    res.status(500).json({
      message: "Ошибка сервера",
      status: "error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "ID задачи не предоставлен",
        status: "error",
      });
      return;
    }

    const foundTask = tasks.find(task => task.id === id);
    if (!foundTask) {
      res.status(404).json({
        message: "Такой задачи не существует",
        status: "error",
      });
      return;
    }

    res.json({
      data: foundTask,
      status: "ok",
    });
  } catch(e) {
    res.status(500).json({
      message: "Ошибка сервера",
      status: "error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newTask = { id: uuid(), ...body };
    tasks.unshift(newTask);
    res.json({
      data: newTask,
      status: "ok",
    });
  } catch(e) {
    res.status(500).json({
      message: "Ошибка сервера",
      status: "error",
    });
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
      res.status(404).json({
        message: "Такой задачи не существует",
        status: "error",
      });
      return;
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
    res.json({
      data: modifiedTask,
      status: "ok",
    });
  } catch(e) {
    res.status(500).json({
      message: "Ошибка сервера",
      status: "error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundTask = tasks.findIndex(task => {
      return task.id === id;
    });
    if (foundTask === -1) {
      res.status(404).json({
        message: "Такой задачи не существует",
        status: "error",
      });
      return;
    }

    res.json({
      data: tasks.splice(foundTask, 1)[0],
      status: "ok",
    });
  } catch(e) {
    res.status(500).json({
      message: "Ошибка сервера",
      status: "error",
    });
  }
});

module.exports = router;