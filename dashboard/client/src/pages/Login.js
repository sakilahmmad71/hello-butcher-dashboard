import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { ArrowForward, Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import './Login.css';
import { loginUser } from '../redux/actions/authAction';
import isEmpty from '../validations/is_empty';
import HelloButcherImage from '../assets/hello-butcher.png';

// Login Component
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const { auth, errors } = props

    // Handlers and useeffect Hooks
    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        props.loginUser(userData);
    };

    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            props.history.push('/dashboard');
        }
    }, [auth]);

    // Making Errors Alert Components
    const showErrorAlert = !isEmpty(errors) ? (
        errors.message ? (
            <Alert severity="error">{errors.message}</Alert>
        ) : null
    ) : null;

    return (
        <div className="login">
            <div className="login__row">
                <Container maxWidth="sm" className="login__container">
                    <div className="login__maincontent">
                        <Box mx="auto" textAlign="center" className="login__header" >
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <div className="login__logo">
                                        <img style={{ width: 50, borderRadius: 50 }} src={HelloButcherImage} alt="Hello Butcher" />
                                        <Typography style={{ marginTop: 7, marginLeft: 10 }} variant="h5" gutterBottom> Hello Butcher</Typography>
                                    </div>
                                </Grid>
                            </Grid>

                            <Divider light />

                            <Grid container direction="column" justify="center" alignItems="center">
                                <Typography variant="h5" color="primary" gutterBottom>Sign In</Typography>
                                <Typography variant="h6" gutterBottom>Sign In Into Your Admin Panel</Typography>
                            </Grid>
                        </Box>

                        <Box className="login__form">
                            <form margin="normal" onSubmit={handleSubmit}>
                                {showErrorAlert}
                                <TextField margin="normal" label="Email / Phone" name="email" fullWidth variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)} />

                                <TextField
                                    margin="normal"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    label="Password"
                                    fullWidth
                                    variant="outlined"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                            <Visibility />
                                                        )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Box className="login__checkbox">
                                    <FormGroup row>
                                        <FormControlLabel control={
                                            <Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checked" color="primary" />}
                                            label="Remember Me"
                                        />
                                    </FormGroup>
                                </Box>

                                <Box className="login__button">
                                    <Button variant="contained" fullWidth color="primary" size="large" type="submit">Log In <ArrowForward fontSize="small" /></Button>
                                </Box>
                            </form>
                        </Box>
                    </div>
                </Container>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
