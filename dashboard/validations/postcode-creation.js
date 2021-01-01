const validator = require('validator');
const isEmpty = require('./is_empty');

const postcodesCreationInputValidation = (data) => {
    let errors = {};

    data.postcodePrefix = !isEmpty(data.postcodePrefix) ? data.postcodePrefix : 0;
    data.shippingCost = !isEmpty(data.shippingCost) ? data.shippingCost : 0;

    if (!data.postcodePrefix) {
        errors.postcodePrefix = 'Post Code Prefix is required.';
    }

    if (!data.shippingCost) {
        errors.shippingCost = 'Shipping Cost is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = postcodesCreationInputValidation;
