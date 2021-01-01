import React, { useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux';

import './PostcodeForm.css'
import Alert from '@material-ui/lab/Alert';
import { addPostcodesToApi } from '../../redux/actions/postcodeAction'

const PostCodeForm = (props) => {
    const [createdSuccessful, setCreatedSuccessful] = useState(false)

    const [postcodePrefix, setPostcodePrefix] = useState('')
    const [shippingCost, setShippingCost] = useState('')

    const { postcodes, loading, error } = props.postcodes

    const handlePostcodeSubmit = (e) => {
        e.preventDefault()

        const newPostcode = {
            postcodePrefix,
            shippingCost
        }

        props.addPostcodesToApi(newPostcode)

        setCreatedSuccessful(true)

        if (!error && !loading) {
            props.history.push('/postcode')
        }
    }

    // Making Success Alert Components
    const showPostcodeCreatedAlert = createdSuccessful ? (
        <Alert severity="success">Post Code Created Successfull</Alert>
    ) : null;

    return (
        <div>
            <div className="postcodeform">
                <Container maxWidth="md">
                    <Box>
                        <Typography variant="h4" align="center">Add New Post Code</Typography>
                        <form margin="normal" onSubmit={handlePostcodeSubmit}>
                            <Grid container>
                                <FormLabel component="legend">{showPostcodeCreatedAlert}</FormLabel>
                                <TextField margin="normal" label="Post Code Prefix" name="postcode" fullWidth variant="outlined" type="text" value={postcodePrefix} onChange={(e) => setPostcodePrefix(e.target.value)} required />
                                <FormControl fullWidth variant="outlined" style={{ marginTop: 10, marginBottom: 10 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Shipping Costs</InputLabel>
                                    <OutlinedInput id="outlined-adornment-amount" labelWidth={150} required value={shippingCost} type="text" onChange={(e) => setShippingCost(e.target.value)}
                                        startAdornment={
                                            <InputAdornment position="start"> £</InputAdornment>
                                        } />
                                </FormControl>
                                <Button margin="normal" fullWidth type="submit" variant="contained" color="primary" style={{ marginTop: 15 }} >Create Available Post Code</Button>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    postcodes: state.postcodes
})

export default connect(mapStateToProps, { addPostcodesToApi })(PostCodeForm)
