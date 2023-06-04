const helper = global.helper;
const { knex } = require('../../../config/db');
const { safePromise, sendMessage, randomToken } = require('../../utilities');
const moment = helper.module.moment;
const { EXPIRY_DURATION, EXPIRY_FORMAT } = require('../../../constants');

async function sendOtp(phoneNumber) {
  const [err, data] = await safePromise(
    knex('OTP')
      .select('expiry','otp')
      .where({
        phone_number: phoneNumber,
        is_active: 1,
        verified: 0
        // expiry : expiry > currentTime
      })
  );
  
  if (err) {
    throw err;
  }
  const expiry = moment().add(EXPIRY_DURATION, EXPIRY_FORMAT).utc().format();
  let otp;
  const currentTime = moment().utc().format();
  if(data.length){
    if(moment(currentTime).isAfter(data[0].expiry)){
      const [err2] = await safePromise(
        knex('OTP')
          .update({is_active: 0})
          .where({phone_number: phoneNumber})
      );
      if (err2) {
        throw err2;
      }
    } else {
      otp = data[0].otp;
    }
  } 
  if(!otp){
    otp = randomToken();
    const [err1] = await safePromise(
      knex('OTP')
        .insert({
          phone_number: phoneNumber,
          otp,
          expiry
        })
    );

    if (err1) {
      throw err1;
    }
  }
  const [err4] = await safePromise(sendMessage(otp, phoneNumber));
  if (err4) {
    throw err4.message;
  }
  return;
}
module.exports = sendOtp;
