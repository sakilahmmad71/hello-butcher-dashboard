const createRandomPassword = (strLength) => {
    strLength =
        typeof strLength === 'number' && strLength > 0 ? strLength : false;

    if (strLength) {
        const possibleCharecters =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let str = '';

        for (let i = 1; i <= strLength; i++) {
            let randomCharecter = possibleCharecters.charAt(
                Math.floor(Math.random() * possibleCharecters.length)
            );
            str += randomCharecter;
        }
        return str;
    } else {
        return false;
    }
};

module.exports = createRandomPassword;
