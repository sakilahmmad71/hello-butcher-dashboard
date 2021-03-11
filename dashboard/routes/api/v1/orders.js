// importing/requiring external dependencies
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const dateTime = require('date-time')

// importing/requiring local files or dependencies
const orderCreationInputValidation = require('../../../validations/order-creation')
const { errorResponse, errorResponseMessage, successResponse } = require('../../../utility/responseReport')
const { checkUserRole } = require('../../../middlewares/auth')
const generateOrderCode = require('../../../utility/generateOrderCode')
const Order = require('../../../models/Order')
const Address = require('../../../models/Address')
const Product = require('../../../models/Product')
const confirmOrderEmail = require('../../../utility/confirmOrderEmail')

// Initializing router for chaining http methods
const router = express.Router()

/*
		@route              GET http://localhost:4000/api/v1/orders/get-order
		@description        Get order by user id
		@required Data      none
		@optional Data      none
		@access             private
*/
router.get('/get-order', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id }).populate({ path: "products", populate: "product" }).populate("address")

		if (orders.length === 0) {
			return res.status(404).json(errorResponseMessage(404, 'No Order found'));
		}

		return res.status(200).json({
			code: 200,
			success: { message: 'Order fetched Successfully' },
			orders,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

/*
		@route              Update http://localhost:4000/api/v1/orders/update-order/orderID
		@description        Update order by user id
		@required Data      status
		@optional Data      none
		@access             private
*/
router.patch('/update-order/:id', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
	try {
		const { id } = req.params
		const { status } = req.body
		const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

		if (!order) {
			return res.status(404).json(errorResponseMessage(404, 'Order Not Found.'))
		}

		return res.status(200).json({
			code: 200,
			success: { message: 'Order Updated Successfully' },
			order
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

/*
		@route              POST http://localhost:4000/api/v1/orders/add-order
		@description        Add a order for specific product
		@required Data      user, address, product, quantity, options
		@optional Data      none
		@access             private
*/
router.post('/add-order', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
	try {
		const { errors, isValid } = orderCreationInputValidation(req.body)

		if (!isValid) {
			return res.status(400).json(errorResponse(400, errors))
		}

		const { _id } = req.user

		const { address, products, quantity, shippingCost, subTotal } = req.body

		const newOrder = new Order({ code: generateOrderCode(), user: _id.toString(), address, products, quantity, shippingCost, subTotal, createdAt: dateTime() })

		await newOrder.save()

		const orderDetailsToSendEmail = await Order.findById(newOrder._id).populate({ path: "products", populate: "product" }).populate("address").populate("user")

		await confirmOrderEmail(orderDetailsToSendEmail)

		return res.status(201).json(successResponse(200, 'Order successfully Places.'))
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

/*
		@route              GET http://localhost:4000/api/v1/orders/all-orders
		@description        Get available orders
		@required Data      none
		@optional Data      none
		@access             private
*/
router.get('/all-orders', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
	try {
		orders = await Order.find({}).populate("user").populate("address").sort({ createdAt: -1 })

		if (orders.length === 0) {
			return res.status(404).json(errorResponseMessage(404, 'No Orders found'));
		}

		return res.status(200).json({
			code: 200,
			success: { message: 'All Notifications fetched Successfully' },
			orders,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

/*
		@route              GET http://localhost:4000/api/v1/orders/all-orders/limit
		@description        Get Limited Orders for dashboard
		@required Data      none
		@optional Data      none
		@access             private
*/
router.get('/all-orders/limit', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
	try {
		// Limiting the number of new orders
		orders = await Order.find({}, null, { limit: 15 }).populate("user").populate("address").sort({ createdAt: -1 })

		if (orders.length === 0) {
			return res.status(404).json(errorResponseMessage(404, 'No Orders found'));
		}

		return res.status(200).json({
			code: 200,
			success: { message: 'All Notifications fetched Successfully' },
			orders,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

/*
		@route              GET http://localhost:4000/api/v1/orders/:id
		@description        Get an order
		@required Data      none
		@optional Data      none
		@access             private
*/
router.get('/:id', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
	try {
		const { id } = req.params

		const order = await Order.findById(id).populate({ path: "products", populate: "product" }).populate("address").populate("user")

		if (!order) {
			return res.status(404).json(errorResponseMessage(404, 'No Order found'));
		}

		return res.status(200).json({
			code: 200,
			success: { message: 'Order fetched Successfully' },
			order,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

/*
		@route              Delete http://localhost:4000/api/v1/orders/all-orders
		@description        Delete All Orders
		@required Data      none
		@optional Data      none
		@access             private
*/
router.delete('/all-orders', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
	try {
		await Order.deleteMany({})

		return res.status(201).json(successResponse(200, 'Orders successfully Deleted.'))
	} catch (error) {
		console.log(error);
		res.status(500).json(errorResponseMessage(500, 'Server Error Happened.'))
	}
})

module.exports = router