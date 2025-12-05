import Task from "../models/Task.js";
export const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    const newTask = await Task.create({
      user_id: req.user.id,
      title,
      description,
      status: status || "pending",
      due_date,
    });

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getTasksByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.findAll({ where: { user_id: userId } });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = status;
    await task.save();
    return res
      .status(200)
      .json({ message: "Task status updated successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, due_date } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.due_date = due_date || task.due_date;
    await task.save();
    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const patchTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    Object.keys(updates).forEach((key) => {
      task[key] = updates[key];
    });
    await task.save();
    return res.status(200).json({ message: "Task patched successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
