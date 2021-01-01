const isEmpty = require('./is_empty');

const orderCreationInputValidation = (data) => {
    let errors = {};

    data.address = !isEmpty(data.address) ? data.address : '';

    if (!data.address) {
        errors.address = 'An address is required.';
    }

    if (data.products.length === 0) {
        errors.order = 'At least one item is required for placing an order.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = orderCreationInputValidation;
