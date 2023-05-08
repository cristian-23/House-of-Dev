const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");
const { User, Property, Favorites, Appointment, Message } = require("./models");

const app = express();
const db = require("./db/db.js");
const port = process.env.PORT;

app.use(
  cors({
    origin: "https://house-of-dev.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`);
  });
});

module.exports = app;
