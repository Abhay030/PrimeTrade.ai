const tasksService = require("./tasks.service");

const createTask = async (req, res, next) => {
  try {
    const task = await tasksService.createTask(req.body, req.user._id);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getTasks(
      req.user._id,
      req.user.role,
      req.query
    );
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await tasksService.getTaskById(
      req.params.id,
      req.user._id,
      req.user.role
    );
    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await tasksService.updateTask(
      req.params.id,
      req.body,
      req.user._id,
      req.user.role
    );
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await tasksService.deleteTask(req.params.id, req.user._id, req.user.role);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
