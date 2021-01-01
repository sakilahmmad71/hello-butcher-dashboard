const validator = require('validator');
const isEmpty = require('./is_empty');

const productCreationInputsValidation = (data, file) => {
    let errors = {};

    data.category = !isEmpty(data.category) ? data.category : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    file = !isEmpty(file) ? file : null;

    if (!data.category) {
        errors.category = 'Category field is required.';
    }

    if (!data.price) {
        errors.price = 'Price field is required.';
    }

    if (!data.title) {
        errors.title = 'Title field is required.';
    }

    if (!data.description) {
        errors.description = 'Description field is required.';
    }

    if (!file) {
        errors.image = 'An image required for showing the product.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = productCreationInputsValidation;
