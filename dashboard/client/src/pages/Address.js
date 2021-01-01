import React from 'react'
import { Grid } from '@material-ui/core'

import './Address.css'
import AddressTable from '../components/address/AddressTable'

const Address = () => {
    return (
        <div className="address">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <AddressTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default Address
