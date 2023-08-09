const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const { upload, removeFileFromS3 } = require("../util/imageHelper");
const { Pet } = require("../models");
require("dotenv").config();

const user = {
  id: process.env.ADMIN_ID,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD_HASH,
};

const isLoggedIn = passport.authenticate("jwt", { session: false });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windows
  message: "Too many requests, please try again later",
});

router.post("/login", limiter, async (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username) {
    res.status(404).send({ message: "failed to find the user" });
  }
  const checkPw = await bcrypt.compare(password, user.password);
  if (!checkPw) {
    return res.status(400).send({ message: "wrong password" });
  }
  const token = jwt.sign({ sub: user.id }, process.env.SESSION_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

router.get("/auth", isLoggedIn, (req, res) => {
  res.status(200).json({ message: "success" });
});

router.post(
  "/upload-imgs",
  isLoggedIn,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const files = req.files;
      // Create an array of the uploaded file URLs
      const images = files.map((file) => {
        return { url: file.location };
      });
      // Do something with the file URLs, such as storing them in a database or sending them in a response
      res.status(200).send({ images });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Error uploading files",
        error: err.message,
      });
    }
  }
);

// delete the image from s3 and also remove it from the mongodb table
router.delete(
  "/delete-img/:key/pet/:petId/img/:imgId",
  isLoggedIn,
  removeFileFromS3,
  async (req, res) => {
    // code to delete the image from the database
    const { petId, imgId } = req.params;
    try {
      await Pet.findByIdAndUpdate(
        petId,
        { $pull: { images: { _id: imgId } } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/add-pets", isLoggedIn, async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    newPet
      ? res.status(201).send({ message: "new pet added" })
      : res.status(400).send({ message: "failed to add new pet" });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error uploading files",
      error: err.message,
    });
  }
});

router.put("/edit-pet/:id", isLoggedIn, async (req, res) => {
  try {
    const newPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(newPet);
  } catch (err) {
    res.status(500).send({ message: "Error editing pets" });
  }
});

router.delete("/delete-pet/:id", isLoggedIn, async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Pet deleted" });
  } catch (err) {
    res.status(404).send();
  }
});

module.exports = router;
