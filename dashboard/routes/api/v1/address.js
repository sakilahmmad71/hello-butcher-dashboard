// importing/requiring external dependencies
const express = require('express')
const jwt = require('jsonwebtoken')
const jwtDecoded = require('jwt-decode')
const passport = require('passport')
const dateTime = require('date-time')

// importing/requiring local files or dependencies
const Address = require('../../../models/Address')
const Postcodes = require('../../../models/Postcodes')
const User = require('../../../models/User')
const addressCreationInputValidation = require('../../../validations/address-creation')
const { errorResponse, errorResponseMessage, successResponse } = require('../../../utility/responseReport')
const { checkUserRole } = require('../../../middlewares/auth')

// Initializing router for chaining http methods
const router = express.Router()

/*
    @route              POST http://localhost:4000/api/v1/add-address
    @description        Make a address for specific user
    @required Data      addressName, streetName, locality, postTown, postCode
    @optional Data      none
    @access             private
*/
router.post('/add-address', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
    try {
        const { errors, isValid } = addressCreationInputValidation(req.body)

        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors))
        }

        const { houseNo, apartmentName, streetName, city, postcodePrefix, postcodeSuffix } = req.body

        const newAddress = new Address({ houseNo, apartmentName, streetName, city, postcodePrefix, postcodeSuffix, createdAt: dateTime(), user: req.user._id })

        const postcodes = await Postcodes.find({})

        const availablePostcodes = postcodes.map(postcode => postcode.postcodePrefix)

        if (!availablePostcodes.includes(postcodePrefix)) {
            return res.status(400).json(errorResponseMessage(400, 'Delivery is not available in this area. try select another address'))
        }

        await newAddress.save()

        return res.status(201).json(successResponse(200, 'New Address added successfully'))

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              GET http://localhost:4000/api/v1/get-address-list
    @description        Get Address by user id
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get('/get-address-list', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
    try {
        const { authorization } = req.headers

        const token = authorization.split(" ")[1]

        const decodedToken = jwtDecoded(token)

        const addresses = await Address.find({ user: decodedToken.id })

        if (addresses.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No Addresses found'));
        }

        // Fetching all the postcodes and getting shipping costs
        const postcodes = await Postcodes.find({})
        const postcodeList = {}
        if (postcodes) {
            postcodes.map((postcode) => postcodeList[postcode.postcodePrefix] = postcode.shippingCost)
        }

        addresses.map((address) => {
            if (postcodeList[address.postcodePrefix]) {
                address.shippingCost = postcodeList[address.postcodePrefix]
            } else {
                address.shippingCost = -1
            }
        })

        return res.status(200).json({
            code: 200,
            success: { message: 'All Addresses for this user is fetched successfully' },
            addresses,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              Delete http://localhost:4000/api/v1/addresses/:id
    @description        Delete Address by id
    @required Data      none
    @optional Data      none
    @access             private
*/
router.delete('/addresses/:id', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
    try {
        const { authorization } = req.headers

        const { id } = req.params

        const token = authorization.split(" ")[1]

        const decodedToken = jwtDecoded(token)

        const addresses = await Address.find({ user: decodedToken.id })

        if (addresses.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No Addresses found'));
        }

        await Address.deleteOne({ id })

        return res.status(200).json(successResponse(200, 'Address Deleted successfully.'))
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              GET http://localhost:4000/api/v1/addresses/addresses
    @description        Get All Addresses
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get('/addresses', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        const addresses = await Address.find().populate("user", "name")

        if (addresses.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No Addresses found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All Addresses for admin is fetched successfully',
            },
            addresses,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              Delete http://localhost:4000/api/v1/addresses/addresses
    @description        Delete All Addresses
    @required Data      none
    @optional Data      none
    @access             private
*/
router.delete('/addresses', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        await Address.deleteMany({})

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All Addresses deleted successfully',
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

module.exports = router