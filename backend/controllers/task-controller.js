const MyError = require("../models/MyError");
const Task = require("../models/task-schema");

const createTask = async (req, res, next) => {
  try {
    console.log("createTask");
    console.log("Uploaded files:", req.files);
    let fixFilesNames = req?.files.map((file) => {
      return "http://localhost:5000/" + file.path.replace(/\\/g, "/");
    });
    console.log(fixFilesNames);
    // Other fields in the form are in req.body
    console.log("Form data:", req.body);
    // return res.json({ status: "ok" });
    const task = new Task({
      ...req.body,
      userId: req.user.id,
      attachments: fixFilesNames,
    });
    await task.save();
    return res.json({ status: "ok", data: task });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const allTasks = async (req, res, next) => {
  try {
    console.log("allTasks");
    const tasks = await Task.find({}).populate("userId", "userName email");

    return res.json({ status: "ok", data: tasks });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const myTasks = async (req, res, next) => {
  try {
    console.log("myTasks");
    const tasks = await Task.find({ userId: req.user.id }).populate(
      "userId",
      "userName email"
    );
    return res.json({ status: "ok", data: tasks });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
module.exports = {
  createTask,
  allTasks,
  myTasks,
};
