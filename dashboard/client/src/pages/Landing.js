import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';

import Poster from '../assets/Poster';

const Landing = () => {
    return (
        <div className="landing">
            <Grid container>
                <nav className="landing__nav">
                    <ul>
                        <li>
                            <Link to="/" className="landing__brand">
                                <motion.h3 whileHover={{ scale: 1.1 }}>Hello Butcher Dashboad</motion.h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="landing__login">
                                <Button variant="contained" color="primary" size="large"> LOG IN</Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Grid>
            <Grid container className="landing__cover">
                <Grid item md={8} sm={6}>
                    <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }}>
                        <Poster />
                    </motion.div>
                </Grid>
                <Grid item md={4} sm={6} className="landing__cover--text">
                    <motion.div initial={{ x: '100vw' }} animate={{ x: 0 }}>
                        <Typography variant="h3" style={{ color: 'indigo', lineHeight: 1.4, marginBottom: 30 }}>Let's Start With Hello Butcher Dashboard</Typography>
                        <Typography variant="subtitle1">
                            Log In to your admin dashboard and manage your
                            business through internet.
                        </Typography>
                        <Link to="/login">
                            <Button variant="contained" fullWidth color="primary" size="large" style={{ marginTop: 30 }}>Getting Started</Button>
                        </Link>
                    </motion.div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Landing;
