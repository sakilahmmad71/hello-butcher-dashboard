const generateSku = (skuLength) => {
    skuLength =
        typeof skuLength === 'number' && skuLength > 0 ? skuLength : false;

    let sku = '';
    if (skuLength) {
        const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < skuLength; i++) {
            const word = words.charAt(Math.floor(Math.random() * words.length));
            if (i > 0 && i % 2 === 0) {
                sku += '-';
            }
            sku += word;
        }

        return sku;
    } else {
        return false;
    }
};

module.exports = generateSku;
