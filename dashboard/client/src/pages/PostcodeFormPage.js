import React from 'react'

import './PostcodeFormPage.css'
import PostcodeForm from '../components/postcodes/PostcodeForm'
import { Grid } from '@material-ui/core'

const PostcodeFormPage = (props) => {

    return (
        <div className="postcodeform__page">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <PostcodeForm {...props} />
                </Grid>
            </Grid>
        </div>
    )
}

export default PostcodeFormPage
