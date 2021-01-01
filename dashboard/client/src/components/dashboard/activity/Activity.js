import React, { useEffect } from 'react';
import { AssignmentReturned, BarChartOutlined, ShowChartOutlined, TimelineOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import dateTime from 'date-time'

import './Activity.css';
import ActivityItem from './ActivityItem';
import { getAllUsersFromApi } from '../../../redux/actions/userAction'
import { getOrdersFromApi } from '../../../redux/actions/ordersAction'

const Activity = (props) => {

    const getAllAvailableData = async () => {
        await props.getAllUsersFromApi()
        await props.getOrdersFromApi()
    }

    useEffect(() => {
        getAllAvailableData()
    }, [])

    const { users } = props.users
    const { orders } = props.orders

    const prefix = (total) => total > 1000 ? (total / 1000) + 'k' : total

    const monthlyIncome = orders.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.subTotal), 0)

    const product = orders.map(order => order.products.map(product => product.quantity))
    const totalQuantity = product.map(item => item.reduce((acc, curr) => acc + parseInt(curr), 0))
    const weeklySales = totalQuantity.reduce((acc, curr) => acc + curr, 0)

    const date = dateTime()
    const today = date.split(" ")[0]
    const todaysSales = orders.reduce((acc, curr) => acc + parseInt(curr.createdAt.includes(today) ? 1 : 0), 0)

    return (
        <div className="activity">
            <Grid container spacing={3}>
                <Grid item md={3} sm={6} xs={12}>
                    <ActivityItem bg="#fd9426" title={`£ ${prefix(monthlyIncome)}`} subtitle="Monthly Income" icon={<AssignmentReturned style={{ fontSize: 60 }} />} />
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <ActivityItem bg="#fc3158" title={weeklySales} subtitle="Weekly Sales" icon={<BarChartOutlined style={{ fontSize: 60 }} />} />
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <ActivityItem bg="#53d769" title={todaysSales} subtitle="Todays Sales" icon={<TimelineOutlined style={{ fontSize: 60 }} />} />
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <ActivityItem bg="#147efb" title={users.length} subtitle="Users" icon={<ShowChartOutlined style={{ fontSize: 60 }} />} />
                </Grid>
            </Grid>
        </div>
    );
};

const stateMapsToProps = (state) => ({
    users: state.users,
    orders: state.orders
})

export default connect(stateMapsToProps, { getAllUsersFromApi, getOrdersFromApi })(Activity);
