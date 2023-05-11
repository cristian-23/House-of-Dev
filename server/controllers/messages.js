const Messages = require("../models/Messages");

const recieveMessage = async (req, res) => {
  const id = req.params.receiverId;
  try {
    const messages = await Messages.findAll({
      where: { receiverId: id },
    });
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (req, res) => {
  const { receiverId } = req.params;
  const { senderId, text } = req.body.data;
  try {
    const message = await Messages.create({ receiverId, senderId, text });
    res.status(201).send(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { recieveMessage, sendMessage };