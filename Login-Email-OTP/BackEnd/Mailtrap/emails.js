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

const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a8d5b9e5-5c03-4b06-8019-cbe496c93a28",
            template_variables: {
                "company_info_name": "PC_Inspire_Technology",
                "name": name
            }
        });
        console.log("Welcome email sent", response);
    } catch (err) {
        console.error(`Error Sending Welcome Email: ${err}`);
        throw new Error(`Error Sending Welcome Email: ${err}`);
    }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail };
