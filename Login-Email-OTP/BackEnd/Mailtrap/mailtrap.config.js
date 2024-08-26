const dotenv = require('dotenv');
const { MailtrapClient } = require('mailtrap');

dotenv.config();

const endpoint = process.env.MAILTRAP_ENDPOINT;
const token = process.env.MAILTRAP_TOKEN;

if (!endpoint || !token) {
    throw new Error("Mailtrap endpoint or token is not defined in the environment variables.");
}

const mailtrapClient = new MailtrapClient({ endpoint, token });

const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "PC_Inspire_Technology",
};

module.exports = { mailtrapClient, sender };
