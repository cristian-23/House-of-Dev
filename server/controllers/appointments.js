const { Appointment, User } = require("../models");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).send(appointments);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createAAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, address, image, userPhone, userName, userEmail, userLastName } =
    req.body.data;
  try {
    const data = {
      date: date,
      address: address,
      UserId: id,
      image: image,
      userPhone: userPhone,
      userName: userName,
      userEmail: userEmail,
      userLastName: userLastName,
    };
    const appointment = await Appointment.create(data);
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllYourAppointment = async (req, res) => {
  try {
    console.log(req.body);
    const appointments = await Appointment.findAll({
      where: { UserId: req.params.id },
    });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getAllAppointments,
  createAAppointment,
  getAllYourAppointment,
};
