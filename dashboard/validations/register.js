const validator = require('validator');
const isEmpty = require('./is_empty');

const registerInputValidation = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!data.name) {
        errors.name = 'Name field is required.';
    } else if (!validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Name must be between 3 to 30 charecter.';
    }

    if (!data.email) {
        errors.email = 'Email field is required.';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email, Provide a valid email.';
    }

    if (!data.phone) {
        errors.phone = 'Phone number field is required.';
    }

    if (!data.password) {
        errors.password = 'Password field is required.';
    } else if (validator.isLength(data.password, { max: 6 })) {
        errors.password = 'Password must be minimum 6 charecter.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = registerInputValidation;
