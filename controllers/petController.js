const router = require("express").Router();
const {
  generateAdoptHtml,
  generateContactHtml,
  mailOptions,
  transporter,
} = require("../util/emailHelper");
const { Pet } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allPets = await Pet.find();
    res.status(200).send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
});

// send the adoption form to the shelter via email
router.post("/adopt", (req, res) => {
  const html = generateAdoptHtml(req);
  transporter.sendMail(
    {
      ...mailOptions,
      subject: "Adopt Request",
      html,
      text: JSON.stringify(req.body),
    },
    function (err, data) {
      if (err) {
        console.log("Error " + err);
        res.status(500).send();
      } else {
        console.log("Email sent successfully");
        res.status(200).send();
      }
    }
  );
});

router.post("/contact", (req, res) => {
  const html = generateContactHtml(req);
  transporter.sendMail(
    {
      ...mailOptions,
      subject: req.body.subject,
      html,
      text: JSON.stringify(req.body),
    },
    function (err, data) {
      if (err) {
        console.log("Error " + err);
        res.status(500).send();
      } else {
        console.log("Email sent successfully");
        res.status(200).send();
      }
    }
  );
});

module.exports = router;
