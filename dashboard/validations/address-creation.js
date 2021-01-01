const isEmpty = require('./is_empty');

const addressCreationInputValidation = (data) => {
    let errors = {};

    data.houseNo = !isEmpty(data.houseNo) ? data.houseNo : '';
    data.apartmentName = !isEmpty(data.apartmentName) ? data.apartmentName : '';
    data.streetName = !isEmpty(data.streetName) ? data.streetName : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.postcodePrefix = !isEmpty(data.postcodePrefix) ? data.postcodePrefix : '';
    data.postcodeSuffix = !isEmpty(data.postcodeSuffix) ? data.postcodeSuffix : '';

    if (!data.houseNo) {
        errors.houseNo = 'House No is required.';
    }

    if (!data.apartmentName) {
        errors.apartmentName = 'Apartment Name is required.';
    }

    if (!data.streetName) {
        errors.streetName = 'Street Name is required.';
    }

    if (!data.city) {
        errors.city = 'City Name is required.';
    }

    if (!data.postcodePrefix) {
        errors.postcodePrefix = 'Prefix of post code is required.';
    }

    if (!data.postcodeSuffix) {
        errors.postcodeSuffix = 'Suffix of post code is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = addressCreationInputValidation;
