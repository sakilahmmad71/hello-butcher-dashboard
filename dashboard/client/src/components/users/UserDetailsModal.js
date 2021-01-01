import React from 'react';
import { motion } from 'framer-motion';
import { Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegUser } from 'react-icons/fa';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import CallIcon from '@material-ui/icons/Call';

import './UserDetailsModal.css';
import Active from './components/Active';
import Inactive from './components/Inactive';

// JSS Styles
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 20,
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

const UserDetailsModal = ({
    modalUser,
    setModalUser,
    showModal,
    setShowModal,
}) => {
    const classes = useStyles();

    const handleCloseModal = (e) => {
        if (e.target.classList.contains('usermodal')) {
            setShowModal(false);
        }
    };

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="usermodal" onClick={handleCloseModal}>
            <motion.div
                className={`usermodal__content ${modalUser.active ? 'active__border' : 'inactive__border'
                    }`}
                initial={{ opacity: 0, y: '-100vh' }}
                animate={{ opacity: 1, y: 0 }}
            >
                <motion.div
                    className="usermodal__main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Grid container alignContent="center">
                        <Grid item md={2} sm={1}></Grid>
                        <Grid item md={8} sm={10}>
                            <div className="usermodal__images">
                                <Grid container>
                                    <Grid item md={2} sm={2}></Grid>
                                    <Grid
                                        item
                                        md={8}
                                        sm={8}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <FaRegUser
                                            style={{
                                                color: '#6ab187',
                                                fontSize: 180,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={2} sm={2}></Grid>
                                </Grid>
                            </div>

                            <div className="">
                                <Grid container>
                                    <Grid item md={12} sm={12}>
                                        <Typography
                                            variant="caption"
                                            component="p"
                                            align="center"
                                            style={{
                                                marginTop: 10,
                                                color: '#6ab187',
                                            }}
                                        >
                                            <div className="usermodal__text">
                                                <div className="usermodal__text--icon">
                                                    <FingerprintIcon />
                                                </div>
                                                <div className="usermodal__text--info">
                                                    {modalUser._id}
                                                </div>
                                            </div>
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            component="h2"
                                            align="center"
                                            style={{
                                                color: '#202020',
                                            }}
                                        >
                                            {modalUser.name}
                                        </Typography>

                                        <Typography
                                            variant="subtitle1"
                                            component="p"
                                            align="center"
                                            style={{ marginTop: 15 }}
                                        >
                                            <div className="usermodal__text">
                                                <div className="usermodal__text--icon">
                                                    <EmailOutlinedIcon />
                                                </div>
                                                <div className="usermodal__text--info">
                                                    {modalUser.email}
                                                </div>
                                            </div>
                                        </Typography>

                                        <Typography
                                            variant="subtitle1"
                                            component="p"
                                            align="center"
                                        >
                                            <div className="usermodal__text">
                                                <div className="usermodal__text--icon">
                                                    <CallIcon />
                                                </div>
                                                <div className="usermodal__text--info">
                                                    {modalUser.phone}
                                                </div>
                                            </div>
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            component="p"
                                            align="center"
                                            style={{
                                                marginTop: 10,
                                                color: 'blue',
                                            }}
                                        >
                                            {modalUser.active ? (
                                                <Active />
                                            ) : (
                                                    <Inactive />
                                                )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid
                            item
                            md={2}
                            sm={1}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Chip
                                label="close"
                                onClick={onCloseModal}
                                style={{ marginTop: -40 }}
                            />
                        </Grid>
                    </Grid>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default UserDetailsModal;
