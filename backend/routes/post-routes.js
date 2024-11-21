let express = require("express");

const { checkSchema, verifyToken } = require("../middleware/schemaValidation");
const upload = require("../middleware/uploadFile");
const {
  getPosts,
  deletePost,
  createPost,
  getPostsSearch,
} = require("../controllers/post-controller");
const router = express.Router();
router.get("/getPostsDashboard", getPosts);
router.get("/getPostsSearch", getPostsSearch);

router.delete("/deletePost/:id", deletePost);
router.post("/createPost", verifyToken, upload.single("file"), createPost);

module.exports = router;
