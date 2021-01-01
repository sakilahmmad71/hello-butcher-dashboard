const generateProductCode = () => {
    return `HB-${Math.floor(Math.random() * 1000 + 1)}`;
};

module.exports = generateProductCode;
