import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.email, // generated ethereal user
    pass: process.env.password, // generated ethereal password
  },
});
  transporter.verify().then(() => {
    console.log("listo para enviar correos");
  }).catch(e=>{
      console.log(e);
  });
