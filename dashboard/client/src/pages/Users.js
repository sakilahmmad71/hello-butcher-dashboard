import React from 'react';
import { Grid } from '@material-ui/core';

import './Users.css';
import UserTable from '../components/users/UserTable';

const Users = (props) => {
    return (
        <div className="users">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <UserTable {...props} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Users;
