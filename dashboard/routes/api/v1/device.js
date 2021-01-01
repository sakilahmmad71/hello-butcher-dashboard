// importing/requiring external dependencies
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const dateTime = require('date-time')

// importing/requiring local files or dependencies
const Device = require('../../../models/Device')
const deviceRegisterInputValidation = require('../../../validations/device-register')
const { errorResponse, errorResponseMessage, successResponse } = require('../../../utility/responseReport')
const { checkUserRole } = require('../../../middlewares/auth')

// Initializing router for chaining http methods
const router = express.Router()

/*
    @route              POST http://localhost:4000/api/v1/devices/register-device
    @description        Register a user device
    @required Data      platform, udid, pushid
    @optional Data      none
    @access             private
*/
router.post('/register-device', passport.authenticate('jwt', { session: false }), checkUserRole(['user']), async (req, res) => {
    try {
        const { errors, isValid } = deviceRegisterInputValidation(req.body)

        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors))
        }

        const { platform, appVersion, brand, udid, pushid } = req.body

        const deviceRegistered = await Device.findOne({ pushid })

        if (deviceRegistered) {
            return res.status(400).json(errorResponseMessage(400, 'Device Already Registered.'))
        }

        const newDevice = new Device({ user: req.user._id, platform, appVersion, brand, udid, pushid, createdAt: dateTime() })

        await newDevice.save()

        return res.status(201).json(successResponse(200, 'Device Registered Successfully'))
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              GET http://localhost:4000/api/v1/devices/devices
    @description        Get All Devices registered
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get('/devices', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        const devices = await Device.find().populate("user", "name").sort({ createdAt: -1 })

        if (devices.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No Devices found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All Registered Devices is fetched successfully',
            },
            devices,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              Delete http://localhost:4000/api/v1/devices/devices
    @description        Delete All Devices registered
    @required Data      none
    @optional Data      none
    @access             private
*/
router.delete('/devices', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        await Device.deleteMany({})

        return res.status(201).json(successResponse(200, 'All Devices Deleted Successfully'))
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

module.exports = router