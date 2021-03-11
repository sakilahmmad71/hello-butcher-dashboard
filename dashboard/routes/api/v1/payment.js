const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dateTime = require('date-time');

// Initializing Stripe and configuring.
const config = require('../../../config/config');
const Payment = require('../../../models/Payment');
const { successResponse } = require('../../../utility/responseReport');
const stripe = require('stripe')(config.stripeSecretKey);
const { checkUserRole } = require('../../../middlewares/auth');
const { Router } = require('express');

// Initializing router for chaining http methods
const router = express.Router();

/*
    @route              POST http://localhost:4000/api/v1/payments/do-payment
    @description        Make payment to app
    @required Data      userId, OrderId, price, createdAt
    @optional Data      none
    @access             private
*/
router.post('/do-payment', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
  const { amount, stripeToken } = req.body;
  console.log(req.user);
  console.log(req.body);
  // const { _id } = req.user;

  // stripe.customers.create({
  //   email: 'sakilahmmad71@gmail.com',
  //   source: stripeToken
  // })
  //   .then(customer => stripe.charges.create({
  //     amount,
  //     description: 'Hello Butcher Mutton Item Purchase',
  //     currency: 'usd',
  //     customer: customer.id
  //   }))
  //   .then(charge => {
  //     res.status(201).json(charge)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500).json(errorResponseMessage(500, 'Server Error Occured.'))
  //   })

  return res.status(200).json(successResponse('Successfully done'))
})

module.exports = router