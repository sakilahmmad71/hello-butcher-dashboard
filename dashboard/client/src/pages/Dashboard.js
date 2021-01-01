import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './Dashboard.css';
import Activity from '../components/dashboard/activity/Activity';
import Status from '../components/dashboard//status/Status';
// import Sales from '../components/dashboard/table/Sales';
import SellsChart from '../components/dashboard/chart/SellsChart';
import OrderTable from '../components/orders/OrderTable';
import { getLimitedOrdersFromApi } from '../redux/actions/ordersAction'

const Dashboard = (props) => {
    const { auth } = props

    useEffect(() => {
        if (!auth.isAuthenticated) {
            props.history.push('/login')
        }
    }, [auth]);

    useEffect(() => {
        props.getLimitedOrdersFromApi()
    }, [])

    const { limitedOrders } = props.orders

    return (
        <div className="dashboard">
            <Activity />
            <Status />
            <SellsChart />
            <OrderTable limitedOrders={limitedOrders} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    orders: state.orders
})

export default connect(mapStateToProps, { getLimitedOrdersFromApi })(Dashboard);
