import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kcovena5034@utm.edu.ec', // generated ethereal user
        pass: '1310775034', // generated ethereal password
    },
});
transporter.verify().then(() => {
    console.log('listo para enviar correos');
});