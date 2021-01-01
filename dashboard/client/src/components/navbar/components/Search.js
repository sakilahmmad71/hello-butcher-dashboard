import React from 'react';
import { Search } from '@material-ui/icons';
import { InputBase } from '@material-ui/core';

import useStyles from './Styles-jss';

const SearchItem = () => {
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <Search style={{ color: '#f1f1f1' }} />
            </div>
            <InputBase
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};

export default SearchItem;
