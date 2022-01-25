const eventEmitter = require('./eventEmitter');
const nodemailer = require("nodemailer");

module.exports = () => {
    
  eventEmitter.on('send_email', (emailData) => {

    let transports = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    let info = transports.sendMail({
      from: process.env.EMAIL_FROM,
      ... emailData,
    });


  /* Message kontrol logo     
    console.log("Mesage sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); 
    */

  });
}