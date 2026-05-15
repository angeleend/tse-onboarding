import TaskModel from "src/models/task";

import type { RequestHandler } from "express";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const allTasks = await TaskModel.find().sort("-dateCreated");
    res.status(200).json(allTasks);
  } catch (error) {
    next(error);
  }
};
