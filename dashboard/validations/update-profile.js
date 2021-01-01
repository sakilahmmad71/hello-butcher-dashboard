const validator = require('validator');

const updateProfileInputValidation = (data) => {
    let errors = {};

    if (!validator.isEmail(data)) {
        errors.message = 'Invalid email, Provide a valid email.';
    }

    return errors;
};

module.exports = updateProfileInputValidation;
