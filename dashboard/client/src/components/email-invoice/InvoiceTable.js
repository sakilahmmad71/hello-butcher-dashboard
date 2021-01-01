import React from 'react'

import './InvoiceTable.css'

const InvoiceTable = () => {
    return (
        <div>
            <div class="container">
                <div class="inv-title"><h1>Invoice # 424773</h1></div>
                {/* <img src="./ZAF.jpg" class="inv-logo" /> */}
                <div class="inv-header">
                    <div>
                        <h2>Hello Butcher</h2>
                        <ul>
                            <li>Pensilvenia - PV</li>
                            <li>United Kingdom</li>
                            <li>888-555-2311 | hellobutcher2020@gmail.com</li>
                        </ul>
                    </div>

                    <div>
                        <table>
                            <tr>
                                <th>Date - Time</th>
                                <td>12-02-2018</td>
                            </tr>
                            <tr>
                                <th>Sub total</th>
                                <td>6500</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>7000</td>
                            </tr>
                        </table>
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
                            <tr>
                                <td><h4>A Simple Product</h4></td>
                                <td>HD-123</td>
                                <td>3</td>
                                <td>2.5Kg</td>
                                <td>$ 10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inv-footer">
                    <div>
                        <table>
                            <tr>
                                <th>Sub total</th>
                                <td>200</td>
                            </tr>
                            <tr>
                                <th>Shipping Costs</th>
                                <td>10</td>
                            </tr>
                            <tr>
                                <th>Grand total</th>
                                <td>1200</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InvoiceTable
