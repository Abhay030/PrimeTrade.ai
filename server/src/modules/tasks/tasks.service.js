const Task = require("../../models/Task");

const createTask = async (data, userId) => {
  const task = await Task.create({ ...data, user: userId });
  return task;
};

const getTasks = async (userId, role, query = {}) => {
  const filter = role === "admin" ? {} : { user: userId };

  // Optional status/priority filters
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;

  const tasks = await Task.find(filter)
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return tasks;
};

const getTaskById = async (taskId, userId, role) => {
  const task = await Task.findById(taskId).populate("user", "name email");

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  // Non-admin users can only access their own tasks
  if (role !== "admin" && task.user._id.toString() !== userId.toString()) {
    const error = new Error("Not authorized to access this task");
    error.statusCode = 403;
    throw error;
  }

  return task;
};

const updateTask = async (taskId, data, userId, role) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (role !== "admin" && task.user.toString() !== userId.toString()) {
    const error = new Error("Not authorized to update this task");
    error.statusCode = 403;
    throw error;
  }

  Object.assign(task, data);
  await task.save();
  return task.populate("user", "name email");
};

const deleteTask = async (taskId, userId, role) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (role !== "admin" && task.user.toString() !== userId.toString()) {
    const error = new Error("Not authorized to delete this task");
    error.statusCode = 403;
    throw error;
  }

  await task.deleteOne();
  return task;
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
