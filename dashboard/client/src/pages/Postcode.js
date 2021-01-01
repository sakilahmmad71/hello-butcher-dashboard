import React from 'react'

import './Postcode.css'
import PostcodeTable from '../components/postcodes/PostcodeTable'
import { Grid } from '@material-ui/core'

const Postcode = (props) => {
    return (
        <div className="postcode">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <PostcodeTable {...props} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Postcode
