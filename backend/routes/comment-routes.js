let express = require("express");

const { checkSchema, verifyToken } = require("../middleware/schemaValidation");
const upload = require("../middleware/uploadFile");
const {
  getComments,
  deleteComment,
  getPostComments,
  addPostComment,
  addRemoveLike,
  editComment,
} = require("../controllers/comment-controller");
const router = express.Router();
router.get("/getCommentsDashboard", getComments);
router.get("/getPostComments/:id", getPostComments);
router.post("/addPostComment", verifyToken, addPostComment);
router.post("/addRemoveLike", verifyToken, addRemoveLike);
router.post("/editComment", verifyToken, editComment);

router.delete("/deleteComment/:id", deleteComment);

module.exports = router;
