const { VERIFICATION_EMAIL_TEMPLATE } = require('../Mailtrap/emailTemplate.js');
const { mailtrapClient, sender } = require('../Mailtrap/mailtrap.config.js');

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try { 
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email verification sent:", response);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
        throw new Error(`Error sending email: ${error}`);
    }
};

module.exports = { sendVerificationEmail };
