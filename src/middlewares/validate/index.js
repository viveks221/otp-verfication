'use strict'
const utilites = require("../../utilities");
const logger = utilites.logger;

const log = logger('validate');
const functionName = "validate-middleware";

let validate = (rules) => {
  return (req, res, next) => {
    let body = req.payload || req.body || {};
    log.info(functionName, "Reqesut body => ", { ...body }, rules);
    utilites.joiValidate(body, rules,  (error) => {
      if (error) {
        return res.status(422).json({
          "status": "fail",
          res: {
            message: "required details are missing"
          }
        })
      }
      return next();
    });
  }
}

module.exports = validate;