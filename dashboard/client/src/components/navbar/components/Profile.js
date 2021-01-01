import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Avatar, Box, Button, Divider, Menu, MenuItem, Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';

import './Profile.css';
import HelloButcherImage from '../../../assets/hello-butcher.png';
import { logoutUser } from '../../../redux/actions/authAction';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

const ProfileStatus = (props) => {
    // const dispatch = useDispatch();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutUser = () => {
        props.logoutUser()
    }

    // console.log(props)

    return (
        <div>
            <Box>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar alt="Hello Butcher" src={HelloButcherImage} />
                    </StyledBadge>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    {/* <Divider /> */}
                    <MenuItem onClick={handleLogoutUser}>
                        Logout <ExitToApp fontSize="small" />
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    );
};

export default connect(null, { logoutUser })(ProfileStatus);
