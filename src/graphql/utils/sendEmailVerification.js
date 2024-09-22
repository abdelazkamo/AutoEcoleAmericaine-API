const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token, url) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // list of receivers
      subject: "Welcome to Auto Ecole Americaine",
      text: "Welcome to Auto Ecole Americaine. Please verify your email by clicking on the following link:",
      html: `
        <h2>Welcome to Auto Ecole Americaine</h2>
        <p>Please verify your email by clicking on the following link:</p>
        <a href="${url}/${token}">Click here</a> 
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = sendVerificationEmail;
