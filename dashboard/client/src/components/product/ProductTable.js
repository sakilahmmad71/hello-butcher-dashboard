import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Grid, Button, CircularProgress, Chip, TablePagination, } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import './ProductTable.css';
import { getAllProductsFromApi } from '../../redux/actions/productAction'
import Spinner from '../common/Spinner';

// Table row and column styling
const StyledTableCell = withStyles((theme) => ({
    head: { backgroundColor: theme.palette.common.white, color: theme.palette.common.black, fontSize: 16, fontWeight: 900 },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 600,
        minHeight: 80,
    },
});

// Product Table Component
const ProductTable = (props) => {
    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    useEffect(() => {
        props.getAllProductsFromApi()
    }, [])

    const { loading, products, error } = props.products

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage)

    let productLoading
    if (loading) {
        productLoading = <Spinner />
    }

    const productsNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no products to show. Make sure some products created.
    </div>)

    // Tags Colours
    const tags = (tagName) => {
        if (tagName === 'chicken') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#fd9426", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'beef') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#fc3158", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'sheep') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#147efb", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'lamb') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#53d769", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'mutton') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#fc3d39", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }
    }

    const prefixProductWeight = (weight) => {
        let prefixWeight
        if (parseInt(weight) >= 1000) {
            prefixWeight = Math.round(parseInt(weight)) / 1000 + "Kg"
        } else {
            prefixWeight = parseInt(weight) + "gm"
        }

        return prefixWeight
    }

    return (
        <>
            <div className="producttable">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <div>
                            <div className="producttable__header">
                                <FeaturedPlayListOutlinedIcon style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                                <Typography variant="h5" noWrap>Products</Typography>
                            </div>

                            <Grid container >
                                <Grid item md={9} sm={9}></Grid>
                                <Grid item md={3} sm={3}>
                                    <Link to={{ pathname: '/add-product', props: { ...props } }} style={{ margin: 10, textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary" style={{ marginBottom: 20 }} startIcon={<AddCircleOutlinedIcon />}>Add New Product</Button>
                                    </Link>
                                </Grid>
                            </Grid>

                            <div>
                                {productLoading ? productLoading : (
                                    (!error && !loading && products.length > 0) ? (
                                        <TableContainer>
                                            <Table className={classes.table} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">#</StyledTableCell>
                                                        <StyledTableCell align="center">Image</StyledTableCell>
                                                        <StyledTableCell align="center">Category</StyledTableCell>
                                                        <StyledTableCell align="center">Title</StyledTableCell>
                                                        <StyledTableCell align="center">Weight</StyledTableCell>
                                                        <StyledTableCell align="center">Price</StyledTableCell>
                                                        <StyledTableCell align="center">Discount</StyledTableCell>
                                                        <StyledTableCell align="center">Action</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                                                        <StyledTableRow key={product._id} hover>
                                                            {/* .replace(/localhost/g, "198.13.36.60") */}
                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="center"><img src={product.file && product.file.replace(/localhost/g, "198.13.36.60")} alt="Product Image" className="producttable__image" /></TableCell>
                                                            <TableCell align="center" fontSize="small" size="small">{tags(product.category)}</TableCell>
                                                            <TableCell align="center"><p>{product.title}</p></TableCell>
                                                            <TableCell align="center"><p>{prefixProductWeight(product.weight)}</p></TableCell>
                                                            <TableCell align="center"><p style={{ color: '#6ab187' }}>£{product.price}</p></TableCell>
                                                            <TableCell align="center"><p style={{ color: '#ea6a47' }}>£{product.discount}</p></TableCell>
                                                            {/* Actions Button */}
                                                            <TableCell align="center">
                                                                <div className="products__action">
                                                                    <motion.div whileHover={{ scale: 1.1 }}>
                                                                        <IconButton aria-label="delete" label="Edit" color="primary" style={{ marginRight: 5 }} onClick={() => props.setSelectedProduct(product)}>
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </motion.div>

                                                                    <motion.div whileHover={{ scale: 1.1 }}>
                                                                        <IconButton aria-label="delete" lebel="Delete" color="secondary" style={{ marginLeft: 5 }} onClick={() => props.setDeletedProduct(product)}>
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </motion.div>
                                                                </div>
                                                            </TableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 53 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                            <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={products.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                        </TableContainer>
                                    ) : productsNotFound)}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

const stateMapsToProps = (state) => ({
    products: state.products
})

export default connect(stateMapsToProps, { getAllProductsFromApi })(ProductTable);
