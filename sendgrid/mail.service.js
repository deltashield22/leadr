module.exports = {
    sendRegistrationConfirmationEmail
}

function sendRegistrationConfirmationEmail(user) {

    let sendMailPromise = new Promise(function (resolve, reject) {
        // const sgMail = require('sendgrid')(process.env.SENDGRID_API_KEY);

        // const email = new sgMail.Email();

        // email.addTo("test@sendgrid.com");
        // email.setFrom(process.env.ORG_FROM_EMAIL);
        // email.setSubject("Registration");
        // email.setHtml(`<a href=${process.env.HOST_URL}/admin/register-confirmation/confirming/${user.emailKey}>Please confirm your email with leadr</a>`);

        // sgMail.send(email, resolve());


        //had to switch to v3 to get rid of bug with addTo not working https://sendgrid.com/docs/Integrate/Code_Examples/v3_Mail/nodejs.html
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: user.email,
            from: process.env.ORG_FROM_EMAIL,
            subject: 'Registration',
            html: `<a href=${process.env.HOST_URL}/admin/register-confirmation/confirming/${user.emailKey}>Please confirm your email with leadr</a>`,
        };
        sgMail.send(msg, resolve());
    })

    return sendMailPromise
}