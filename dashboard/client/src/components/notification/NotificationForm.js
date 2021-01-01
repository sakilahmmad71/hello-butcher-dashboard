import React, { useState } from 'react'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'

import './NotificationForm.css'
import { addNotificationsToApi } from '../../redux/actions/notificationAction'
import Alert from '@material-ui/lab/Alert';

const NotificationForm = (props) => {
    const location = useLocation()

    const [createdSuccessful, setCreatedSuccessful] = useState(false)

    const [value, setValue] = useState('all');
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const { notifications, loading, error } = props.notifications

    const handleNotificationSubmit = () => {
        const newNotification = {
            platform: value,
            title,
            details
        }

        props.addNotificationsToApi(newNotification)

        setCreatedSuccessful(true)

        if (!error && !loading) {
            location.props.history.push('/notifications')
        }
    }

    // Making Success Alert Components
    const showNotificationCreatedAlert = createdSuccessful ? (
        <Alert severity="success">Notification Created Successfull</Alert>
    ) : null;

    return (
        <div className="notificationform">
            <Container maxWidth="md">
                <Box>
                    <form margin="normal" onSubmit={handleNotificationSubmit}>
                        <Grid container>
                            <FormControl component="fieldset">
                                {showNotificationCreatedAlert}
                                <FormLabel component="legend">Select Users</FormLabel>
                                <RadioGroup aria-label="users" name="users" value={value} onChange={handleChange}>
                                    <FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
                                    <FormControlLabel value="ios" control={<Radio color="primary" />} label="iOS" />
                                    <FormControlLabel value="android" control={<Radio color="primary" />} label="Android" />
                                </RadioGroup>
                            </FormControl>
                            <TextField margin="normal" label="Title" name="title" fullWidth variant="outlined" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <TextField margin="normal" required label="Details" name="details" fullWidth variant="outlined" multiline rows={12} type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
                            <Button margin="normal" fullWidth type="submit" variant="contained" color="primary" style={{ marginTop: 15 }} >Create Notification</Button>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    notifications: state.notifications
})

export default connect(mapStateToProps, { addNotificationsToApi })(NotificationForm)
