const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
const mailOptions = {
  from: process.env.EMAIL,
  to: "rosheenqu@gmail.com",
};

const generateAdoptHtml = (req) => {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adopt Request</title>

</head>

<body>
    <form>
        <h2>Adoption Application Form</h2>
        <fieldset>
            <legend>About You</legend>
            <div>
                <span>Name:</span>
                <span>${req.body.name}</span>
            </div>
            <div>
                <span>Email:</span>
                <span>${req.body.email}</span>
            </div>
            <div>
                <span>Phone:</span>
                <span>${req.body.phone}</span>
            </div>
            <div>
                <span>City:</span>
                <span>${req.body.city}</span>
            </div>
            <div>
                <span>State/Province:</span>
                <span>${req.body.state}</span>
            </div>
            <div>
                <span>ZIP/Postal Code:</span>
                <span>${req.body.zip}</span>
            </div>
            <div>
                <span>Country:</span>
                <span>${req.body.country}</span>
            </div>
            <div>
                <span>Occupation:</span>
                <span>${req.body.occupation}</span>
            </div>
            <div>
                <span>Number of people in your household:</span>
                <span>${req.body.household}</span>
            </div>
            <div>
                <span>Do you have a yard?</span>
                <span>${req.body.yard}</span>
            </div>
            <div>
                <span>Do you have any other pets?</span>
                <span>${req.body.pets}</span>
            </div>
            <div>
                <span>Reason for Adoption:</span>
                <span>${req.body.reason}</span>
            </div>
        </fieldset>
        <fieldset>
            <legend>About the ${req.body.type}</legend>
            <div>
                <span>ID:</span>
                <span>${req.body.id}</span>
            </div>
            <div>
                <span>Name:</span>
                <span>${req.body.dogName}</span>
            </div>
            <div>
                <span>Breed:</span>
                <span>${req.body.breed}</span>
            </div>
            <div>
                <span>Age:</span>
                <span>${req.body.age}</span>
            </div>
            <div>
                <span>Size:</span>
                <span>${req.body.size}</span>
            </div>
            <div>
                <span>Gender:</span>
                <span>${req.body.gender}</span>
            </div>
            <div>
                <span>Activity Level:</span>
                <span>${req.body.activity}</span>
            </div>
        </fieldset>
    </form>
</body>

</html>`;
};

const generateContactHtml = (req) => {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form</title>
    </head>
    
    <body>
        <div>
            <span>Subject:</span>
            <span>${req.body.otherSubject}</span>
        </div>
        <div>
            <span>Name:</span>
            <span>${req.body.name}</span>
        </div>
        <div>
            <span>Email:</span>
            <span>${req.body.email}</span>
        </div>
        <div>
            <span>Phone:</span>
            <span>${req.body.phone}</span>
        </div>
        <div>
            <span>Message:</span>
            <span>${req.body.message}</span>
        </div>
    
    </body>
    
    </html>`;
};

module.exports = {
  transporter,
  mailOptions,
  generateAdoptHtml,
  generateContactHtml,
};
