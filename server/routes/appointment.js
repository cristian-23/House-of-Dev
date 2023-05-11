const {
  getAllAppointments,
  createAAppointment,
  getAllYourAppointment,
} = require("../controllers/appointments");
const {
  validateAuth,
  validateAdmin,
} = require("../middleware/auth");

const router = require("express").Router();

//admin

router.post("/", validateAuth, validateAdmin, getAllAppointments);

//usuario

router.post("/:id", validateAuth, createAAppointment);

router.post("/all/:id", validateAuth, getAllYourAppointment);

module.exports = router;
