'use strict';

const welcome = require('./welcome');
const sendOtp = require('./send-otp');
const verifyOtp = require('./verify-otp');

module.exports = {
  welcome,
  sendOtp,
  verifyOtp     
};