import React from 'react';
import { motion } from 'framer-motion';
import { Button, Grid, Typography } from '@material-ui/core';
import { Skeleton, Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import './ProductModal.css';

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

const ProductModal = ({ selectedProduct, setSelectedProduct }) => {
    const classes = useStyles();

    const handleCloseModal = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedProduct(null);
        }
    };
    return (
        <div className="backdrop" onClick={handleCloseModal}>
            <motion.div
                className="modal__content"
                initial={{ opacity: 0, y: '-100vh' }}
                animate={{ opacity: 1, y: 0 }}
            >
                <motion.div
                    className="modal__main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Grid container>
                        <Grid item md={11} sm={11}></Grid>
                        <Grid
                            item
                            md={1}
                            sm={1}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                marginTop: 15,
                            }}
                        >
                            <Button onClick={() => setSelectedProduct(null)}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container className="product__container">
                        <Grid item md={6} sm={12} className="product__image">
                            <img
                                className="modal__image"
                                src={selectedProduct.image}
                                alt="Product Image"
                            />

                            <div className="thumbnail__images">
                                <Grid container>
                                    <Grid item md={4} sm={4}>
                                        <Skeleton
                                            variant="rect"
                                            width={150}
                                            height={100}
                                        />
                                    </Grid>

                                    <Grid item md={4} sm={4}>
                                        <Skeleton
                                            variant="rect"
                                            width={150}
                                            height={100}
                                        />
                                    </Grid>

                                    <Grid item md={4} sm={4}>
                                        <Skeleton
                                            variant="rect"
                                            width={150}
                                            height={100}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item md={6} sm={12} className="product__details">
                            <Button variant="contained" disabled>
                                {selectedProduct.category}
                            </Button>

                            <Typography
                                variant="h4"
                                component="h4"
                                align="center"
                                style={{ marginTop: 10 }}
                            >
                                {selectedProduct.name}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                component="p"
                                align="center"
                            >
                                {selectedProduct.title}
                            </Typography>

                            <Typography
                                variant="h6"
                                component="h5"
                                align="center"
                                style={{ marginTop: 10, color: '#1c4e80' }}
                            >
                                {selectedProduct.sku}
                            </Typography>

                            <Typography
                                variant="h4"
                                component="h4"
                                align="center"
                                style={{ marginTop: 10, color: '#6ab187' }}
                            >
                                $ {selectedProduct.price}
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                component="p"
                                style={{
                                    marginTop: 15,
                                    color: '#7e909a',
                                    padding: 30,
                                }}
                            >
                                {selectedProduct.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProductModal;
