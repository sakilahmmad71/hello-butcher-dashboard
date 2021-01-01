import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import './Product.css';
import ProductTable from '../components/product/ProductTable';
import EditProduct from '../components/product/EditProduct';
import DeleteProduct from '../components/product/DeleteProduct';

const Products = (props) => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [deletedProduct, setDeletedProduct] = useState(null);

    return (
        <div className="product">
            <Grid container className="product__table">
                <Grid item md={12} sm={12} xs={12}>
                    <ProductTable
                        {...props}
                        setSelectedProduct={setSelectedProduct}
                        setDeletedProduct={setDeletedProduct}
                    />
                </Grid>
            </Grid>

            {/* Product Edit Modal */}
            {selectedProduct && (
                <EditProduct
                    {...props}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
            )}

            {/* Product Delete Modal */}
            {deletedProduct && (
                <DeleteProduct
                    {...props}
                    deletedProduct={deletedProduct}
                    setDeletedProduct={setDeletedProduct}
                />
            )}
        </div>
    );
};

export default Products;
