const router = require("express").Router();

const {
  validateAuth,
  validateAdmin,
  validateAuthAdminByParams,
} = require("../middleware/auth");
const { passwordValidator } = require("../middleware/passwordValidator");
const {
  login,
  register,
  editProfile,
  getAllUsers,
  infoUser,
  editUser,
  deleteUser,
} = require("../controllers/user");

router.post("/register", passwordValidator, register);

router.post("/login", login);

router.put("/profile/:id", validateAuth, editProfile);

// ADMIN ROUTES FIND AND EDIT USERS

router.post("/", validateAuth, validateAdmin, getAllUsers);

router.post("/admin/:id", validateAuth, validateAdmin, infoUser);

router.put("/:id", validateAuth, validateAdmin, editUser);

router.delete("/:admin/:id", validateAuthAdminByParams, validateAdmin, deleteUser );

module.exports = router;

//Users[citas.UserId-1]
