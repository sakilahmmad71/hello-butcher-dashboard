// importing/requiring external dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// importing/requiring local files or dependencies
const Admin = require('../../../models/Admin');
const User = require('../../../models/User');
const config = require('../../../config/config');
const adminRegisterInputValidation = require('../../../validations/admin-register');
const adminLoginInputValidation = require('../../../validations/admin-login');
const {
    successResponse,
    errorResponse,
    errorResponseMessage,
} = require('../../../utility/responseReport');
const { checkAdminRole, checkUserRole } = require('../../../middlewares/auth');

// Initializing router for chaining http methods
const router = express.Router();

// constant variables
const ROUND = 8;

/*
    @route              POST http://localhost:4000/api/v1/admins/register
    @description        Register route for register an admin to the application
    @required Data      name, email, phone, password
    @optional Data      none
    @access             public  
*/
router.post('/register', async (req, res) => {
    try {
        const { errors, isValid } = adminRegisterInputValidation(req.body);

        const { name, email, phone, password } = req.body;

        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors));
        }

        const admin = await Admin.findOne({ email });

        // Checking the admin already exist or not
        if (admin) {
            return res
                .status(400)
                .json(
                    errorResponseMessage(
                        400,
                        'An admin with this email is already exists.'
                    )
                );
        }

        // Making round or generating salt
        const salt = await bcrypt.genSalt(ROUND);

        // Hashing the password and setting the newUser password to hashed password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user with user data
        const newAdmin = new Admin({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        // Saving the user to the database
        await newAdmin.save();

        return res
            .status(201)
            .json(
                successResponse(200, 'An Admin Registration Successfully done.')
            );
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              POST http://localhost:4000/api/v1/admins/login
    @description        Login route for login in to the user profile
    @required Data      email, password
    @optional Data      none
    @access             public
*/
router.post('/login', async (req, res) => {
    try {
        const { errors, isValid } = adminLoginInputValidation(req.body);

        // Destructuring fields from body
        const { email, password } = req.body;

        // Checking whatif the inputs are invalid
        if (!isValid) {
            return res.status(400).json(errorResponse(400, errors));
        }

        // Finding user by given email
        const admin = await Admin.findOne({ email });

        // Checking the admin exist or not
        if (!admin) {
            errors.message = 'Admin not found';
            return res.status(404).json(errorResponse(404, errors));
        }

        const isMatchedPassword = await bcrypt.compare(
            password,
            admin.password
        );

        // Checking the given password matched or not
        if (!isMatchedPassword) {
            errors.message = 'Incorrect Admin password.';
            return res.status(400).json(errorResponse(400, errors));
        }

        const payload = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        };

        const token = await jwt.sign(payload, config.jwtSecret, {
            expiresIn: '60d',
        });

        // If somehow there is no token
        if (!token) {
            return res
                .status(500)
                .json(
                    errorResponseMessage(
                        500,
                        'Cannot generate Token for admin.'
                    )
                );
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'Login Successful',
            },
            token: `Bearer ${token}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              GET http://localhost:4000/api/v1/admins/users
    @description        Getting all register users
    @required Data      none
    @optional Data      none
    @access             private
*/
router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['admin']),
    async (req, res) => {
        try {
            const users = await User.find();

            if (!users) {
                return res
                    .status(404)
                    .json(errorResponseMessage(404, 'No users found.'));
            }

            users.forEach((user) => (user.password = null));

            return res.status(200).json({
                code: 200,
                success: {
                    message: 'users Successfully fetched.',
                },
                users: users,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

/*
    @route              GET http://localhost:4000/api/v1/admins/user/:id
    @description        Getting a user by user id
    @required Data      ID as params
    @optional Data      none
    @access             private
*/
router.get(
    '/user/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const params = req.params;
            if (!params.id) {
                return res
                    .status(400)
                    .json(
                        errorResponseMessage(
                            400,
                            'User id is required as parameter.'
                        )
                    );
            }

            const user = await User.findById(params.id);

            if (!user) {
                return res
                    .status(400)
                    .json(
                        errorResponseMessage(400, 'No user found with user id.')
                    );
            }

            user.password = null;

            return res.status(200).json({
                code: 200,
                success: {
                    message: 'user Successfully fetched.',
                },
                user: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

module.exports = router;
