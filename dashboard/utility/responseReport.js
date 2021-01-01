const successResponse = (statusCode, responseMessage) => {
    return {
        code: statusCode,
        success: {
            message: responseMessage,
        },
    };
};

const errorResponse = (statusCode, responseMessage) => {
    return {
        code: statusCode,
        errors: responseMessage,
    };
};

const errorResponseMessage = (statusCode, responseMessage) => {
    return {
        code: statusCode,
        errors: {
            message: responseMessage,
        },
    };
};

module.exports = { successResponse, errorResponse, errorResponseMessage };
