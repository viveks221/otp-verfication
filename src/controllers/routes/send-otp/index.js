const express = require('express');
const router = express.Router();
const middlewares = require('../../../middlewares');
const services = require('../../../services');
const rules = require('../../../../rules');
const { safePromise } = require('../../../utilities');
const validate = middlewares.validate;
const sanitize = middlewares.sanitize;
const sendOtp = services.sendOtp;

router
  .route('/send-otp')
  .post(sanitize, validate(rules.sendOtp), async (req, res) => {
    const {phoneNumber} = req.payload;
    const [err] = await safePromise(sendOtp(phoneNumber));

    if (err) {
      return res.status(500).json({
        "status": "fail",
        message: err,
        res: {
         
        }
      });
    }

    res.json({
      status: "sucess",
      message: "otp sent",
      res: {
        
      }
    });
  });
 
module.exports = router;
