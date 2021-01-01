import { Typography } from '@material-ui/core';
import { SaveAltRounded } from '@material-ui/icons';
import React from 'react';

const SalesHeader = ({ title }) => {
    return (
        <div>
            <div className="sales__header">
                <SaveAltRounded
                    style={{
                        fontSize: 50,
                        background: 'white',
                        padding: 10,
                        borderRadius: '50%',
                        marginRight: 20,
                        boxShadow: '0 2px 20px -5px #2196f3',
                    }}
                />
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
            </div>
        </div>
    );
};

export default SalesHeader;
