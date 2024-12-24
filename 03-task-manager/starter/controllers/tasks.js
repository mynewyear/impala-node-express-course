const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomAPIError } = require("../errors/custom-error");

const getAllTasks = async (req, res) => {
  //res.send("all items from the file");
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getTask = async (req, res) => {
  //res.json({ id: req.params.id });
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
};

const updateTask = (req, res) => {
  res.send("Update task");
};

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };