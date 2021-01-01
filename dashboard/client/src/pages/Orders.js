import React from 'react';
import { Grid } from '@material-ui/core';

import './Orders.css';
import OrderTable from '../components/orders/OrderTable'

const Orders = () => {
    return (
        <div className="orders">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <OrderTable />
                </Grid>
            </Grid>
        </div>
    );
};

export default Orders;
