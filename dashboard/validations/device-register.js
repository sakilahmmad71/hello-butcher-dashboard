const isEmpty = require('./is_empty');

const deviceRegisterInputValidation = (data) => {
    let errors = {};

    data.platform = !isEmpty(data.platform) ? data.platform : '';
    data.udid = !isEmpty(data.udid) ? data.udid : '';
    data.pushid = !isEmpty(data.pushid) ? data.pushid : '';

    if (!data.platform) {
        errors.platform = 'Platform field is required.';
    }

    if (!data.udid) {
        errors.udid = 'udid field is required.';
    }

    if (!data.pushid) {
        errors.pushid = 'pushid field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = deviceRegisterInputValidation;
