// Requiring Environment Variables
require('dotenv').config()

// importing/requiring external dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

// importing/requiring internal files
const messaging = require('./push/service')
const dataBaseConnection = require('./config/db.connction');
const adminsRoute = require('./routes/api/v1/admins');
const usersRoute = require('./routes/api/v1/users');
const productsRoute = require('./routes/api/v1/products');
const notificationRoute = require('./routes/api/v1/notification');
const addressRoute = require('./routes/api/v1/address');
const postcodesRoute = require('./routes/api/v1/postcodes');
const deviceRoute = require('./routes/api/v1/device');
const orderRoute = require('./routes/api/v1/orders');
const paymentRoute = require('./routes/api/v1/payment');

// Creatting App with express
const App = express();

// setting up morgan to see every request on console
App.use(morgan('dev'));

// settingup bodyparser middleware for parsing data from body
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(cors());

// Serving Static folder
App.use(express.static('uploads'));

// Passport middleware
App.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

/*
 *  All of our application route goes there
 */
App.use('/api/v1/admins', adminsRoute);
App.use('/api/v1/users', usersRoute);
App.use('/api/v1/products', productsRoute);
App.use('/api/v1/notifications', notificationRoute);
App.use('/api/v1/', addressRoute);
App.use('/api/v1/postcodes', postcodesRoute);
App.use('/api/v1/devices', deviceRoute);
App.use('/api/v1/orders', orderRoute);
App.use('/api/v1/payments', paymentRoute);

/*
 *  Handelling 404 Not Found route with custom error and status
 */
App.use((req, res, next) => {
    const error = new Error('Route Not Found - 404');
    error.status = 404;
    next(error);
});

App.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        code: error.status,
        error: {
            messsage: error.message,
        },
    });
});

// Initializing development port
const PORT = process.env.PORT || 4000;

// Creating application server and listening to the port
App.listen(PORT, () => {
    dataBaseConnection();
    console.log(`Server Listening On Port ${PORT} Up and Running...`);
})