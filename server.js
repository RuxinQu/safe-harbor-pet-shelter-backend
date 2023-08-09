const express = require("express");
const passport = require("passport");
require("./util/passport");
const jwt = require("jsonwebtoken");
const db = require("./db/connection");
const router = require("./controllers");
const { transporter } = require("./util/emailHelper");

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// mongoose.set("debug", true);

app.use(passport.initialize());
app.use(router);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}!`);
    transporter.verify((err, success) => {
      err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
    });
  });
});
