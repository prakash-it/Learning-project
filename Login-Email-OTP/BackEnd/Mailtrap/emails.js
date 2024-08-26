const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('../Mailtrap/emailTemplate.js');
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

const sendPasswordResetEmail = async (email,resetURL)=>{
    const recipient = [{ email }];

    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:"Password Reset"
        })
        console.log("Welcome email sent", response);
    }catch(error){
        console.error(`Error Sending Welcome Email: ${error}`);
        throw new Error(`Error Sending Welcome Email: ${error}`);
    }
}

const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try{

        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successsful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
category:"Password Reset"
        })
    }catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
}


module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail,sendResetSuccessEmail };
