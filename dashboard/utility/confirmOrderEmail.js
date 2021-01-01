const nodemailer = require('nodemailer');

const confirmOrderEmail = (orderDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hellobutcher.co.uk@gmail.com',
            pass: 'Developers-3.Hello.Butcher.co.uk',
        },
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Invoice</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
            <style>
                @media print {
                    @page {
                        size: A3;
                    }
                }
                ul {
                    padding: 0;
                    margin: 0 0 1rem 0;
                    list-style: none;
                }
                body {
                    font-family: "Inter", sans-serif;
                    margin: 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table,
                table th,
                table td {
                    border: 1px solid silver;
                }
                table th,
                table td {
                    text-align: right;
                    padding: 8px;
                }
                h1, h4, p {
                    margin: 0;
                }
    
                .container {
                    padding: 20px 0;
                    width: 100%;
                    max-width: 80%;
                    margin: 0 auto;
                }
    
                .inv-title {
                    padding: 10px;
                    border: 1px solid silver;
                    text-align: center;
                    margin-bottom: 30px;
                }
    
                .inv-logo {
                    width: 150px;
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 40px;
                }
    
                .inv-header {
                    display: flex;
                    justify-content: space-between;
                }

                .inv-header > :nth-child(1) {
                    flex: 2;
                }
                .inv-header > :nth-child(2) {
                    flex: 1;
                }
                .inv-header h2 {
                    font-size: 20px;
                    margin: 0 0 0.3rem 0;
                }
                .inv-header ul li {
                    font-size: 15px;
                    padding: 3px 0;
                }
    
                .inv-body table th,
                .inv-body table td {
                    text-align: left;
                }
                .inv-body {
                    margin-bottom: 30px;
                }
    
                .inv-footer {
                    display: flex;
                    flex-direction: row;
                }
                .inv-footer > :nth-child(1) {
                    flex: 2;
                }
                .inv-footer > :nth-child(2) {
                    flex: 1;
                }
            </style>
        </head>
        <body>
            <div>
                <div class="container">
                    <div class="inv-title"><h1>${orderDetails.code}</h1></div>
                    <div class="inv-header">
                        <div>
                            <h2>Hello Butcher</h2>
                            <ul>
                                <li>Pensilvenia - PV</li>
                                <li>United Kingdom</li>
                                <li>888-555-2311</li>
                                <li>hellobutcher2020@gmail.com</li>
                            </ul>
                            <h2>${orderDetails.user.name}</h2>
                            <ul>
                                <li>${orderDetails.address.apartmentName}, ${orderDetails.address.houseName}</li>
                                <li>${orderDetails.address.city}, ${orderDetails.address.postcodePrefix}-${orderDetails.address.postcodeSuffix}</li>
                                <li>${orderDetails.user.phone}</li>
                                <li>${orderDetails.user.email}</li>
                            </ul>
                        </div>
                    </div>

                    <div class="inv-body">
                        <table>
                            <thead>
                                <th>Product</th>
                                <th>Code</th>
                                <th>Quantity</th>
                                <th>Weight</th>
                                <th>Price</th>
                            </thead>
                            <tbody>
                                ${orderDetails.products.map(product => `<tr><td><h4>${product.product.title}</h4></td><td>${product.product.code}</td><td>${product.quantity}</td><td>${product.product.weight}</td><td>£ ${product.product.price}</td></tr>`).join("")}
                            </tbody>
                        </table>
                    </div>
                
                    <div class="inv-footer">
                        <div>
                            <table>
                                <tr>
                                    <th>Date - Time</th>
                                    <td>${orderDetails.createdAt}</td>
                                </tr>
                                <tr>
                                    <th>Sub total</th>
                                    <td>£ ${orderDetails.subTotal}</td>
                                </tr>
                                <tr>
                                    <th>Shipping Costs</th>
                                    <td>£ ${orderDetails.shippingCost}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>£ ${parseFloat(orderDetails.subTotal) + parseFloat(orderDetails.shippingCost)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `

    const mailOptions = {
        from: 'hellobutcher.co.uk@gmail.com',
        to: [orderDetails.user.email, 'hellobutcher2020@gmail.com'],
        subject: `Product Confirmation Invoice.`,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        } else {
            return true;
        }
    });
};

module.exports = confirmOrderEmail