const nodemailer = require("nodemailer");
require("dotenv").config();
const { APP_PASSWORD_NODEMAILER } = process.env;


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "tmsalbanesi@gmail.com", // generated ethereal user
      pass: APP_PASSWORD_NODEMAILER, // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log("ready for send emails");
})

module.exports = transporter;