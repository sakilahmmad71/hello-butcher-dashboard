import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    CartesianAxis,
} from 'recharts';

import './SalesDataChart.css';
import salesData from './salesData';

const useStyles = makeStyles((theme) => ({
    chartWrap: {
        overflow: 'auto',
        marginTop: theme.spacing(2),
    },
    chartFluid: {
        width: '100%',
        minWidth: 400,
        height: 500,
        marginLeft: theme.spacing(1) * -3,
    },
}));

const SalesDataChart = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.chartWrap}>
                <div className={classes.chartFluid}>
                    <ResponsiveContainer>
                        <BarChart data={salesData}>
                            <XAxis dataKey="name" tickLine={false} />
                            <YAxis
                                axisLine={false}
                                tickSize={3}
                                tickLine={false}
                                tick={{ stroke: 'none' }}
                            />
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />
                            <CartesianAxis />
                            <Tooltip />
                            <Bar dataKey="Chickens" fill="#fd9426" />
                            <Bar dataKey="Beefs" fill="#fc3158" />
                            <Bar dataKey="Sheeps" fill="#147efb" />
                            <Bar dataKey="Others" fill="#53d769" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default SalesDataChart;
