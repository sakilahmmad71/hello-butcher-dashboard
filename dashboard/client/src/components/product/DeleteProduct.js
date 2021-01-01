import { Box, Button, Grid, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import React from 'react';
import { connect } from 'react-redux';

import './DeleteProduct.css';
import { deleteProductToApi } from '../../redux/actions/productAction';
import Spinner from '../common/Spinner';

const DeleteProduct = (props) => {
    const { deletedProduct, setDeletedProduct } = props

    const { loading, error } = props.products

    const handleProductDelete = async (id) => {
        await props.deleteProductToApi(id)
        setDeletedProduct(null)

        if (!loading && !error) {
            await props.history.push('/products')
        }
    }

    let productDeleteLoading
    if (loading) {
        productDeleteLoading = <Spinner />
    }

    return (
        <div className="deleteproduct__backdrop">
            <motion.div className="deleteproduct__content" initial={{ opacity: 0, y: '-100vh' }} animate={{ opacity: 1, y: 0 }}>
                <motion.div className="deleteproduct__main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Grid container>
                        <Grid item md={2} sm={1}></Grid>
                        <Grid item md={8} sm={10}>
                            <Box mx="auto" textAlign="center">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Typography variant="h4" color="primary" gutterBottom >Delete Product</Typography>
                                    <Typography variant="h4" color="secondary" gutterBottom>{deletedProduct.name}</Typography>
                                    {loading ? productDeleteLoading : <Typography variant="h6" gutterBottom> Are You Sure To Delete This Product?</Typography>}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={2} sm={1}></Grid>
                    </Grid>

                    <Grid container>
                        <Grid item md={2} sm={1}></Grid>
                        <Grid item md={8} sm={10}>
                            <div className="deleteproduct__buttons">
                                <Button variant="contained" color="secondary" onClick={() => handleProductDelete(deletedProduct._id)}>Delete</Button>
                                <Button variant="contained" color="primary" onClick={() => setDeletedProduct(null)}>Cancel</Button>
                            </div>
                        </Grid>
                        <Grid item md={2} sm={1}></Grid>
                    </Grid>
                </motion.div>
            </motion.div>
        </div>
    );
};

const stateMapsToProps = (state) => ({
    products: state.products
})

export default connect(stateMapsToProps, { deleteProductToApi })(DeleteProduct);
