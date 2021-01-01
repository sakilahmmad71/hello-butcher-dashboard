const validator = require('validator');
const isEmpty = require('./is_empty');

const forgotPasswordInputValidation = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';

    if (!data.email) {
        errors.email = 'Email field is required.';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email, Provide a valid email.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = forgotPasswordInputValidation;
