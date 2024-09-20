const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

//transport
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

//transport
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'michel89@ethereal.email',
//         pass: 'yYWAW95F4948pqKTay'
//     }
// });

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;
    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "please Provides All fields",
      });
    }
    //email details
    transporter.sendMail({
      to: "swiftnliftit1@gmail.com",
      from: "yogesh.i.swiftnlift@gmail.com",
      subject: "Regarding Software Services",
      html: `
             <h5>Details Info</h5>
             <ul>
                <li><p>Name: ${name}</p></li>
                <li><p>Name: ${email}</p></li>
                <li><p>Name: ${msg}</p></li>
             </ul>
            `
    });
    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API ERROR",
      error,
    });
  }
};
module.exports = { sendEmailController };
