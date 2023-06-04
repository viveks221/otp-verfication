const express = require('express');
const router = express.Router();
const middlewares = require('../../../middlewares');
const services = require('../../../services');
const rules = require('../../../../rules');
const validate = middlewares.validate;
const sanitize = middlewares.sanitize;
const verifyOtp= services.verifyOtp;
const { safePromise } = require('../../../utilities');


router
  .route('/verify-otp')
  .post(sanitize, validate(rules.verify), async (req, res) => {
    const body = req.payload;
    const [err] = await safePromise(verifyOtp(body));
    if (err) {
      return res.status(500).json({
        status: "fail",
        res: {
          message: err
        }
      });
    }
    res.json({
      status: "sucess",
      res: {
        message: "otp verified"
      }
    });
  });

module.exports = router;