// importing/requiring external dependencies
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const dateTime = require('date-time')

// importing/requiring local files or dependencies
const Notification = require('../../../models/Notification')
const Device = require('../../../models/Device')
const notificationCreationInputValidation = require('../../../validations/notification-creation')
const { errorResponse, errorResponseMessage, successResponse } = require('../../../utility/responseReport')
const { checkUserRole } = require('../../../middlewares/auth')
const sendNotificationToDevice = require('../../../push/notify')

// Initializing router for chaining http methods
const router = express.Router()

/*
    @route              POST http://localhost:4000/api/v1/notifications
    @description        Make a notification for let people know about upcoming product details
    @required Data      platform, title, details
    @optional Data      none
    @access             private
*/
router.post('/', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        const { errors, isValid } = notificationCreationInputValidation(req.body)

        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors))
        }

        const { platform, title, details } = req.body

        const devicePushIds = await Device.find({})

        let pushIds
        if (devicePushIds.length > 0) {
            pushIds = devicePushIds.map(device => device.pushid)
        }

        const newNotification = new Notification({
            platform, title, details, createdAt: dateTime()
        })

        const notificationData = {
            title: title,
            body: details
        }

        sendNotificationToDevice(pushIds, notificationData)

        await newNotification.save()

        return res.status(201).json(successResponse(200, 'New Notification Created Successfully'))

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              GET http://localhost:4000/api/v1/notifications
    @description        Get all Available created notifications
    @required Data      none
    @optional Data      none
    @access             public
*/
router.get('/', async (req, res) => {
    try {

        const { platform } = req.headers

        const notificationProjection = {
            _id: false
        }

        const notifications = await Notification.find({ $or: [{ platform }, { platform: "all" }] }, notificationProjection).sort({ createdAt: -1 })

        if (notifications.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No Notification found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All Notifications fetched Successfully',
            },
            notifications,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              GET http://localhost:4000/api/v1/all-notifications
    @description        Get all created notifications
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get('/all-notifications', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 })

        if (notifications.length === 0) {
            return res.status(404).json(errorResponseMessage(404, 'No Notification found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All Notifications fetched Successfully',
            },
            notifications,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              DELETE http://localhost:4000/api/v1/notifications
    @description        Delete all Available notifications
    @required Data      none
    @optional Data      none
    @access             private
*/
router.delete('/', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
    try {
        await Notification.deleteMany({});

        return res.status(200).json({
            code: 200,
            success: {
                message: 'All Notifications Deleted',
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
    }
})

/*
    @route              POST http://localhost:4000/api/v1/notifications/send-notification
    @description       Send Notification to users
    @required Data      none
    @optional Data      none
    @access             private
*/
// router.post('/', passport.authenticate('jwt', { session: false }), checkUserRole(['admin']), async (req, res) => {
//     try {
//         const {}
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(errorResponseMessage(500, 'Something went wrong.'))
//     }
// })


module.exports = router