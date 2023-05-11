const { validateToken } = require("../config/token");
const { User } = require("../models");

const validateAuth = (req, res, next) => {
  console.log(req.body, "soy el req.body");
  const { token } = req.body;
  console.log(token);
  if (!token) return res.status(400).json({ error: "token does not exist" });
  const user = validateToken(token);
  if (!user)
    return res.status(401).json({ error: "the user is not logged in" });
  req.user = user;
  next();
};

const validateAuthAdminByParams = async (req, res, next) => {
  try {
    const token = req.params.admin;
    if (!token) return res.status(400).json({ error: "token does not exist" });
    const user = validateToken(token);
    if (!user)
      return res.status(401).json({ error: "the user is not logged in" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
const validateAdmin = (req, res, next) => {
  const { admin } = req.user.user;

  if (!admin)
    return res
      .status(401)
      .json({ error: "there are no administrator permissions" });

  next();
};

module.exports = {
  validateAdmin,
  validateAuth,
  validateAuthAdminByParams,
};
