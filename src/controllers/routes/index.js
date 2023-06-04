const express = require('express');
const router  = express.Router();

//Write a loader here to avoid adding manual routes.
router.use(require(`./welcome`));
router.use(require(`./send-otp`));
router.use(require(`./verify-otp`));
//health-check
router.use('/health-check', (req, res) => {
  res.json({
    alive: `${req.path} => yes`
  });
});
//index route
router.use('/', (req, res) => {
  res.json({
    ok: 1
  });
});



module.exports = router;