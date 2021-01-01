const generateOrderCode = () => {
    let code = ""
    const possible = "0123456789"

    for (let i = 0; i < 4; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return `HBO-${code}`
}

module.exports = generateOrderCode