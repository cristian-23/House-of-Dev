const { Router } = require("express");

const {
  validateAuth,
  validateAdmin,
  validateAuthAdminByParams,
} = require("../middleware/auth");
const {
  addOrDeleteFavorite,
  getAllYourFavorites,
  getFavoritesOfUser,
} = require("../controllers/favorites");

const router = Router();

router.post("/:id", validateAuth, addOrDeleteFavorite);

router.post("/all/:id", validateAuth, getAllYourFavorites);

// ADMIN

router.get(
  "/:admin/:id",
  validateAuthAdminByParams,
  validateAdmin,
  getFavoritesOfUser
);

module.exports = router;
