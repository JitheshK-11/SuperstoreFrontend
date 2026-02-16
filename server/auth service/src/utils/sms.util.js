import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;

let client = null;

export const sendSms = async ({ to, body }) => {
	if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
		throw new Error("Twilio is not configured");
	}

	if (!client) {
		client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
	}

	return client.messages.create({
		from: TWILIO_FROM_NUMBER,
		to,
		body
	});
};
