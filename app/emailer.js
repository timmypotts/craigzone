const nodemailer = require("nodemailer");

const Mailer = function(user) {
  var subject = `We found a ${user.listing} in your area!`;
  var emailBody = `We have found a listing that matches your parameters!:
  ${user.listingLink}`;
  var accountEmail = user.email;

  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "craigfinderalert@gmail.com",
      pass: "b00g3yman"
    }
  });

  const message = {
    from: "craigfinderalert@gmail.com", // Sender address
    to: accountEmail, // List of recipients
    subject: subject, // Subject line
    text: emailBody // Plain text body
  };
  message, accountEmail, subject, emailBody;

  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info);
    }
  });
};

module.exports = Mailer;
