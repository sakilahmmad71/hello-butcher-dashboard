import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import './SellsChart.css';
import SalesDataChart from './SalesDataChart';

const SellsChart = () => {
    return (
        <div className="sellschart">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <div className="status__header">
                        <EqualizerIcon style={{ fontSize: 50, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                        <Typography variant="h6" noWrap>Product Sells Stats</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <SalesDataChart />
                </Grid>
            </Grid>
        </div>
    );
};

export default SellsChart;
