// importing/requiring external dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validator = require('validator');

// importing/requiring local files or dependencies
const User = require('../../../models/User');
const config = require('../../../config/config');
const registerInputValidation = require('../../../validations/register');
const loginInputValidation = require('../../../validations/login');
const changePasswordInputValidation = require('../../../validations/change-password');
const forgotPasswordInputValidation = require('../../../validations/forgot-password');
const updateProfileInputValidation = require('../../../validations/update-profile')
const createRandomPassword = require('../../../utility/randomPassword');
const generateForgotPasswordEmail = require('../../../utility/forgotPasswordEmail');
const { successResponse, errorResponse, errorResponseMessage } = require('../../../utility/responseReport');
const isEmpty = require('../../../validations/is_empty');
const { checkUserRole } = require('../../../middlewares/auth');

// Initializing router for chaining http methods
const router = express.Router();

// constant variables
const ROUND = 8;

/*
    @route              POST http://localhost:4000/api/v1/users/register
    @description        Register route for register an user to the application
    @required Data      name, email, phone, password
    @optional Data      none
    @access             public  
*/
router.post('/register', async (req, res) => {
    try {
        const { errors, isValid } = registerInputValidation(req.body);

        const { name, email, phone, password } = req.body;

        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors));
        }

        const user = await User.findOne({ email });

        // Checking the user already exist or not
        if (user) {
            return res
                .status(400)
                .json(
                    errorResponseMessage(
                        400,
                        'An user with this email is already exists.'
                    )
                );
        }

        // Making round or generating salt
        const salt = await bcrypt.genSalt(ROUND);

        // Hashing the password and setting the newUser password to hashed password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user with user data
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        // Saving the user to the database
        await newUser.save();

        return res
            .status(201)
            .json(successResponse(200, 'Registration Successfully done.'));
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              POST http://localhost:4000/api/v1/users/login
    @description        Login route for login in to the user profile
    @required Data      email, password
    @optional Data      none
    @access             public
*/
router.post('/login', async (req, res) => {
    try {
        const { errors, isValid } = loginInputValidation(req.body);

        // Destructuring fields from body
        const { email, password } = req.body;

        // Checking whatif the inputs are invalid
        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors));
        }

        // Finding user by given email
        const user = await User.findOne({ email });

        // Checking the user exist or not
        if (!user) {
            errors.message = 'User not found';
            return res.status(404).json(errorResponse(404, errors));
        }

        const isMatchedPassword = await bcrypt.compare(password, user.password);

        // Checking the given password matched or not
        if (!isMatchedPassword) {
            errors.message = 'Incorrect password.';
            return res.status(400).json(errorResponse(400, errors));
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = await jwt.sign(payload, config.jwtSecret, {
            expiresIn: '60d',
        });

        // If somehow there is no token
        if (!token) {
            return res
                .status(500)
                .json(errorResponseMessage(500, 'Cannot generate Token.'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'Login Successful',
            },
            token: `Bearer ${token}`,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              POST http://localhost:4000/api/v1/users/update-profile
    @description        update profile route took some data, validate them and saves to DB.
    @required Data      name / email / phone (at least one is required must)
    @optional Data      name, email, phone
    @access             private
*/
router.post(
    '/update-profile',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['user']),
    async (req, res) => {
        try {
            const errors = {}

            if (isEmpty(req.body)) {
                return res.status(400).json(errorResponseMessage(400, 'Make sure you update at least one field.'));
            }

            const { _id } = req.user

            const user = await User.findOne({ _id })

            if (req.body.name) {
                if (!validator.isLength(req.body.name, { min: 3, max: 30 })) {
                    errors.name = 'Name must be between 3 to 30 charecter.';
                    return res.status(400).json(errorResponse(400, errors));
                }

                user.name = req.body.name;
            }

            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    errors.email = 'Please provide a valid email address.';
                    return res.status(400).json(errorResponse(400, errors));
                }

                // const userExists = await User.findOne({
                //     email: req.body.email,
                // });

                // if (userExists) {
                //     return res.status(400).json(errorResponseMessage(400, 'A user with this email already exists.'));
                // }

                user.email = req.body.email;
            }

            await user.save();

            return res
                .status(200)
                .json(successResponse(200, 'Profile successfully updated.'));
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

/*
    @route              POST http://localhost:4000/api/v1/users/change-password
    @description        Change Password Route for change user password
    @required Data      old password, new password
    @optional Data      none
    @access             private
*/
router.post(
    '/change-password',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['user']),
    async (req, res) => {
        try {
            const { errors, isValid } = changePasswordInputValidation(req.body);

            // Checking whatif the inputs are invalid
            if (!isValid) {
                return res.status(400).json(errorResponse(400, errors));
            }

            const { password, newPassword } = req.body;

            if (password === newPassword) {
                return res
                    .status(400)
                    .json(
                        errorResponseMessage(
                            400,
                            'It is look like you have entered old password.'
                        )
                    );
            }

            const { email } = req.user;

            const user = await User.findOne({ email });

            const isMatchedPassword = await bcrypt.compare(
                password,
                user.password
            );

            // Checking the given password matched or not
            if (!isMatchedPassword) {
                errors.password = 'Incorrect old password.';
                return res.status(400).json(errorResponse(400, errors));
            }

            // Making round or generating salt
            const salt = await bcrypt.genSalt(ROUND);

            // Hashing the password and setting the newUser password to hashed password
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Saving new password to database
            user.password = hashedPassword;

            await user.save();

            return res
                .status(200)
                .json(successResponse(200, 'Password changed successfully.'));
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

/*
    @route              POST http://localhost:4000/api/v1/users/forgot-password
    @description        Forgot Password route for Send an email with new password
    @required Data      email
    @optional Data      none
    @access             private
*/
router.post(
    '/forgot-password',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['user']),
    async (req, res) => {
        try {
            const { errors, isValid } = forgotPasswordInputValidation(req.body);

            // Checking whatif the inputs are invalid
            if (!isValid) {
                return res.status(400).json(errorResponse(400, errors));
            }

            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json(errorResponseMessage(404, 'No user found.'));
            }
            // Generate a random password
            const generatedRandomPassword = createRandomPassword(ROUND);

            // Making round or generating salt
            const salt = await bcrypt.genSalt(ROUND);

            // Hashing the password and setting the newUser password to hashed password
            const hashedPassword = await bcrypt.hash(
                generatedRandomPassword,
                salt
            );

            // Saving new password to database
            user.password = hashedPassword;

            await user.save();

            // Sending generated email to user
            await generateForgotPasswordEmail(email, generatedRandomPassword);

            return res
                .status(200)
                .json(
                    successResponse(
                        200,
                        'An email sent with new login password.'
                    )
                );
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

/*
    @route              POST http://localhost:4000/api/v1/users/register-device
    @description        register device route get device information and uniqly identify.
    @required Data      none
    @optional Data      none
    @access             private
*/
router.post(
    '/register-device',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['user']),
    async (req, res) => {
        try {
            const { platform, appVersion, phone, udid, pushId } = req.body;

            if (!req.user.email) {
                return res
                    .status(401)
                    .json(errorResponseMessage(401, 'User does not verifid.'));
            }

            const user = await User.findOne({ email: req.user.email });

            if (!user) {
                return res
                    .status(404)
                    .json(errorResponseMessage(404, 'No user found.'));
            }

            if (user.device) {
                return res
                    .status(404)
                    .json(
                        errorResponseMessage(
                            400,
                            'Your device already registered.'
                        )
                    );
            }

            const deviceInfo = { platform, appVersion, phone, udid, pushId };

            user.device = deviceInfo;

            await user.save();

            return res.status(200).json(successResponse(200, 'Device registered successful.'));
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

/*
    @route              GET http://localhost:4000/api/v1/users/get-profile
    @description        get loggedin users profile.
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get(
    '/get-profile',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const { _id } = req.user

            const userProjection = {
                _id: false,
                role: false,
                createdAt: false,
                password: false,
                __v: false
            }

            const user = await User.findOne({ _id }, userProjection)

            if (!user) {
                return res.status(404).json(errorResponseMessage(400, 'User Not Found'));
            }

            return res.status(200).json({
                code: 200,
                success: { message: 'User Profile Successfully Fetched.' },
                user,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
)


/*
    @route              POST http://localhost:4000/api/v1/users/count
    @description        Count all users.
    @required Data      none
    @optional Data      none
    @access             private
*/
// router.get(
//     '/count',
//     passport.authenticate('jwt', { session: false }),
//     checkUserRole(['admin']),
//     async (req, res) => {
//         try {
//             const lengthOfUsers = await User.count({})
//             return res.status(200).json({ code: 200, count: lengthOfUsers });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json(
//                 errorResponseMessage(500, 'Something went wrong.')
//             );
//         }
//     })

// **************************************************************************
// TODO: Update token is not yet confirmed.
// FIXME: When it does confirm make it workable.

/*
    @route              POST http://localhost:4000/api/v1/users/update-token
    @description        Update token route create a token that lasts long.
    @required Data      none
    @optional Data      none
    @access             private
*/
// router.post(
//     '/update-token',
//     passport.authenticate('jwt', { session: false }),
//     async (req, res) => {
//         try {
//             const { authorization } = req.headers;

//             if (!authorization) {
//                 return res
//                     .status(401)
//                     .json(errorResponseMessage(401, 'Token is required.'));
//             }

//             const incomingToken = authorization.split(' ')[1];

//             const decoded = await jwt.verify(incomingToken, config.jwtSecret);

//             const { id, name, email } = decoded;

//             // const payload = { id, name, email };

//             const token = await jwt.sign(
//                 { id, name, email },
//                 config.jwtSecret,
//                 {
//                     expiresIn: '45d',
//                 }
//             );

//             // If somehow there is no token
//             if (!token) {
//                 return res
//                     .status(500)
//                     .json(errorResponseMessage(500, 'Cannot update Token.'));
//             }

//             return res.status(200).json({
//                 code: 200,
//                 success: {
//                     message: 'Token Updated Successfully.',
//                     token: `Bearer ${token}`,
//                 },
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json(
//                 errorResponseMessage(500, 'Something went wrong.')
//             );
//         }
//     }
// );

// ******************************************************************************

module.exports = router;
