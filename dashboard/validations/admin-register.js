const validator = require('validator');
const isEmpty = require('./is_empty');

const adminRegisterInputValidation = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!data.name) {
        errors.name = 'Admin name field is required.';
    } else if (!validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Admin name must be between 3 to 30 charecter.';
    }

    if (!data.email) {
        errors.email = 'Admin email field is required.';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid Admin email, Provide a valid email.';
    }

    if (!data.phone) {
        errors.phone = 'Admin phone number field is required.';
    }

    if (!data.password) {
        errors.password = 'Admin password field is required.';
    } else if (validator.isLength(data.password, { max: 6 })) {
        errors.password = 'Admin password must be minimum 6 charecter.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = adminRegisterInputValidation;
