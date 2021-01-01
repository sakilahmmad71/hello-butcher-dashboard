import React from 'react'
import { Button, Grid } from '@material-ui/core'

import './Notification.css'
import NotificationTable from '../components/notification/NotificationTable'

const Notification = (props) => {
    return (
        <div className="notification">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <NotificationTable {...props} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Notification
