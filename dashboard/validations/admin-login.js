const validator = require('validator');
const isEmpty = require('./is_empty');

const adminLoginInputValidation = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!data.email) {
        errors.message = 'Admin email field is required.';
    } else if (!validator.isEmail(data.email)) {
        errors.message = 'Invalid admin email, Provide a valid email.';
    }

    if (!data.password) {
        errors.message = 'Admin password field is required.';
    } else if (validator.isLength(data.password, { max: 6 })) {
        errors.message = 'Admin password must be minimum 6 charecter.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = adminLoginInputValidation;
