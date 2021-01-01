import React from 'react'

import './NotificationFormPage.css'
import NotificationForm from '../components/notification/NotificationForm'
import { Grid } from '@material-ui/core'

const NotificationFormPage = () => {
    return (
        <div className="notificationform__page">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <NotificationForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default NotificationFormPage
