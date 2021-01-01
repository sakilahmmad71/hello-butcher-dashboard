const validator = require('validator');
const isEmpty = require('./is_empty');

const changePasswordInputValidation = (data) => {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';

    if (!data.password) {
        errors.password = 'Password field is required.';
    }

    if (!data.newPassword) {
        errors.newPassword = 'New Password field is required.';
    } else if (validator.isLength(data.newPassword, { max: 6 })) {
        errors.newPassword = 'New Password must be minimum 6 charecter.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = changePasswordInputValidation;
