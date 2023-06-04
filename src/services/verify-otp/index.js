const helper = global.helper;
const { safePromise } = require('../../utilities');
const { knex } = require('../../../config/db');
const moment = helper.module.moment;
async function verifyOtp(body) {
  const { otp, phoneNumber } = body;
  const [error, data1] = await safePromise(
    knex('OTP')
      .select('expiry')
      .where({
        phone_number: phoneNumber,
        is_active: 1,
        otp: +otp
      })
  );
  if (error) {
    throw error;
  }
  if (!data1.length) {
    throw ("please enter the correct otp");
  }
  const { expiry } = data1[0];
  const currentTime = moment().utc().format();
  if (moment(currentTime).isAfter(expiry)) {
    const [err] = await safePromise(
      knex('OTP')
        .update({
          is_active: 0,
        })
    );
    if (err) {
      throw err;
    }
    throw ("otp is expired");
  }
  const [err2] = await safePromise(
    knex('OTP')
      .update({
        verified: 1,
        is_active: 0
      })
      .where({
        is_active: 1,
        phone_number: phoneNumber
      }) 
  );
  if (err2) {
    throw err2;
  }
  return;
}
module.exports = verifyOtp;