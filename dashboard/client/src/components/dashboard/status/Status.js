import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Category, AddOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';

import './Status.css';
import StatusItem from './StatusItem';
import { getAllProductsFromApi } from '../../../redux/actions/productAction'

const Status = (props) => {
    const getAllAvailableData = async () => {
        await props.getAllProductsFromApi()
    }
    useEffect(() => {
        getAllAvailableData()
    }, [])

    const { products } = props.products

    return (
        <div className="status">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <div className="status__header">
                        <InfoIcon style={{ fontSize: 50, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                        <Typography variant="h6" noWrap> Products Informations</Typography>
                    </div>
                </Grid>

                <Grid item md={6} sm={6} xs={12}>
                    <StatusItem title="5" subtitle="Categories" icon={<Category className="statusItem__icon" style={{ fontSize: 50, background: 'blue', padding: 10, borderRadius: '50%', boxShadow: '0 2px 20px -5px #6ab187', }} />} />
                </Grid>

                <Grid item md={6} sm={6} xs={12}>
                    <StatusItem title={products.length} subtitle="Products" icon={<AddOutlined style={{ fontSize: 50, background: 'green', padding: 10, borderRadius: '50%', boxShadow: '0 2px 20px -5px #6ab187' }} />} />
                </Grid>
            </Grid>
        </div>
    );
};

const stateMapsToProps = (state) => ({
    products: state.products
})

export default connect(stateMapsToProps, { getAllProductsFromApi })(Status);
