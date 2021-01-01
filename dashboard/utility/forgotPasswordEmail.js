const nodemailer = require('nodemailer');

const createForgotPasswordEmail = (userEmail, generatedPassword) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hellobutcher.co.uk@gmail.com',
            pass: 'Developers-3.Hello.Butcher.co.uk',
        },
    });

    const userName = userEmail.split('@')[0];

    const mailOptions = {
        from: 'hellobutcher.co.uk@gmail.com',
        to: userEmail,
        subject: `Reset User Password`,
        html: `
        <h2>New Password</h2>
        <h3>Hello ${userName}</h3>
        <h4> You have got Request For New Password </h4><br>
        <h1>${generatedPassword}</h1><br>
        <p>Use This Password For Login. </p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        } else {
            return true;
        }
    });
};

module.exports = createForgotPasswordEmail;
