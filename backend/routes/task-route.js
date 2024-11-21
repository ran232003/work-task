let express = require("express");

const { checkSchema, verifyToken } = require("../middleware/schemaValidation");
//const upload = require("../middleware/uploadFile");

const {
  createTask,
  getTasks,
  myTasks,
  allTasks,
} = require("../controllers/task-controller");
const upload = require("../middleware/upload");
const router = express.Router();
router.post(
  "/createTask",
  verifyToken,
  upload.array("attachments"),
  createTask
);
router.get("/myTasks", verifyToken, myTasks);
router.get("/allTasks", verifyToken, allTasks);

module.exports = router;
