// importing/requiring external dependencies
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const dateTime = require('date-time')

// importing/requiring local files or dependencies
const Postcodes = require('../../../models/Postcodes')
const postcodesCreationInputValidation = require('../../../validations/postcode-creation')
const { errorResponse, errorResponseMessage, successResponse } = require('../../../utility/responseReport')
const { checkUserRole } = require('../../../middlewares/auth')

// Initializing router for chaining http methods
const router = express.Router()

/*
    @route              POST http://localhost:4000/api/v1/postcodes/add-postcode
    @description        Add a post code where people can get services
    @required Data      postCode, shippingCost
    @optional Data      none
    @access             private
*/
router.post('/add-postcode', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        const { errors, isValid } = postcodesCreationInputValidation(req.body)

        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors))
        }

        const { postcodePrefix, shippingCost } = req.body

        const postCodeExist = await Postcodes.find({ postcodePrefix })

        if (postCodeExist.length > 0) {
            return res.status(400).json(errorResponseMessage(400, 'This Post Code already exist try add another one'))
        }

        const newPostCode = new Postcodes({ postcodePrefix, shippingCost, createdAt: dateTime() })

        await newPostCode.save()

        return res.status(201).json(successResponse(200, 'New Post Code added successfully'))

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})


/*
    @route              GET http://localhost:4000/api/v1/postcodes/postcode
    @description        Get all available services post codes
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get('/postcode', passport.authenticate('jwt', { session: false }), checkUserRole(['user', 'admin']), async (req, res) => {
    try {
        const postcodes = await Postcodes.find().sort({ createdAt: -1 })

        if (postcodes.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No post code found for services'))
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All post codes is fetched successfully',
            },
            postcodes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})


/*
    @route              Delete http://localhost:4000/api/v1/postcodes/postcode
    @description        Delete all available services post codes
    @required Data      none
    @optional Data      none
    @access             private
*/
router.delete('/postcode', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        await Postcodes.deleteMany({})


        return res.status(200).json({
            code: 200,
            success: { message: 'All Post Codes are Deleted' },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

module.exports = router