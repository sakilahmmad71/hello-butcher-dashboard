const validator = require('validator');
const isEmpty = require('./is_empty');

const notificationCreationInputValidation = (data) => {
    let errors = {};

    data.platform = !isEmpty(data.platform) ? data.platform : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.details = !isEmpty(data.details) ? data.details : '';

    if (!data.platform) {
        errors.platform = 'Notification platform is required.';
    }

    if (!data.title) {
        errors.title = 'Notification title is required.';
    }

    if (!data.details) {
        errors.details = 'Notification details is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = notificationCreationInputValidation;
