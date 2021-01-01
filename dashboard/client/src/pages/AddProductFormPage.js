import React from 'react';
import { Grid } from '@material-ui/core';

import './AddProductFormPage.css';
import ProductForm from '../components/add-products/ProductForm';

const AddProduct = () => {
    return (
        <div className="addproduct">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <ProductForm />
                </Grid>
            </Grid>
        </div>
    );
};

export default AddProduct;
