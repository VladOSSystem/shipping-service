const nodemailer = require('nodemailer');

const massageManager = async (name, surname, email) => {
    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',  
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: '', // generated ethereal user
      pass: '', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Shipping service', // sender address
    to: `${email}`, // list of receivers
    subject: "Congrats for join us ✔", // Subject line 
    text: "Thanks for joning us!", // plain text body
    html: `<b>${name}-${surname}</b>`, // html body
  }, (err, info) => {
    if(err)
        console.log(err);
    else
        console.log(info);
  }); 


}

exports.massageManager = massageManager;