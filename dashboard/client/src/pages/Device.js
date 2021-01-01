import React from 'react'
import { Grid } from '@material-ui/core'

import './Device.css'
import DeviceTable from '../components/device/DeviceTable'

const Device = () => {
    return (
        <div className="device">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <DeviceTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default Device
