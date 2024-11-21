let express = require("express");
const {
  signup,
  login,
  updateUser,
  getUsers,
  deleteUser,
  getUser,
  signout,
  getUserSelect,
} = require("../controllers/user-controllers");
const { checkSchema, verifyToken } = require("../middleware/schemaValidation");
// const upload = require("../middleware/uploadFile");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
// router.post("/updateUser", verifyToken, upload.single("file"), updateUser);
router.get("/getUserssDashboard", getUsers);
router.get("/getUserSelect/:value", getUserSelect);

router.get("/getUser", verifyToken, getUser);
router.post("/signout", signout);

router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
