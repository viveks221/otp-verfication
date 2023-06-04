const config = require('../../config');
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const messagingServiceSid = config.MESSAGING_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);
const safePromise = require('../utilities/safe-promise');

async function sendMessage (otp, phoneNumber) {
  const messsage = client.messages.create({
    body: otp,
    messagingServiceSid: messagingServiceSid,
    to: phoneNumber
  });
  const [err, data] = await safePromise(messsage);
  if (err) {
    throw err;
  }
  return data;   
}
module.exports = sendMessage;
