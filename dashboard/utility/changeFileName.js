const crypto = require('crypto');

const changeFileName = () => {
    const name = crypto.randomBytes(4).toString('hex');
    return name;
};

module.exports = changeFileName;
