'use strict'
const utilites = require("../../utilities");
const logger = utilites.logger;

const log = logger('sanitize');
const functionName = "sanitize-middleware";

let sanitize = (req, res, next) => {
  const payload = req.body;
  const sanitized_payload = {};
  log.info(functionName, "Incoming Headers", JSON.stringify(req.headers));
  log.info(functionName, "Req Body", JSON.stringify(payload));

  //Sanitize input payload - Example
  
  if (payload.phoneNumber) {
    sanitized_payload.phoneNumber= (payload.phoneNumber).toString().trim();
  }
  
  if (payload.otp) {
    sanitized_payload.otp = (payload.otp).toString().trim();
  }
  req.payload = sanitized_payload;

  next();
}


module.exports = sanitize;