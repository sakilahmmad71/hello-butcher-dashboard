import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Grid, Button, CircularProgress, Chip, TablePagination, } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import EditIcon from '@material-ui/icons/Edit';
import LineWeightIcon from '@material-ui/icons/LineWeight';

import './OrderTable.css'
import { getOrdersFromApi } from '../../redux/actions/ordersAction'
import Spinner from '../common/Spinner'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Table row and column styling
const StyledTableCell = withStyles((theme) => ({
    head: { backgroundColor: theme.palette.common.white, color: theme.palette.common.black, fontSize: 16, fontWeight: 900 },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: { '&:nth-of-type(even)': { backgroundColor: theme.palette.action.hover } }
}))(TableRow);

const useStyles = makeStyles({ table: { minWidth: 600, minHeight: 80 } });

// OrderTable Component.
const OrderTable = (props) => {
    const classes = useStyles();

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    useEffect(() => {
        props.getOrdersFromApi(props.maxOrder)
    }, [])

    let { loading, orders, error } = props.orders

    if (props.limitedOrders) {
        orders = props.limitedOrders
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage)

    let orderLoading
    if (loading) {
        orderLoading = <Spinner />
    }

    const ordersNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no orders to show. Make sure some orders created.
    </div>)

    // Tags Colours
    const tags = (tagName) => {
        if (tagName === 'requested') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#fd9426", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'accepted') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#147efb", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'delivered') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#53d769", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'cancelled') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#f50057", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }
    }

    return (
        <>
            <div className="ordertable">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <div>
                            <div className="ordertable__header">
                                <ShoppingCartOutlinedIcon style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                                <Typography variant="h5" noWrap>Orders</Typography>
                            </div>

                            <div>
                                {orderLoading ? orderLoading : (
                                    (!error && !loading && orders.length > 0) ? (

                                        <TableContainer>
                                            <Table className={classes.table} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">#</StyledTableCell>
                                                        <StyledTableCell align="center">User</StyledTableCell>
                                                        <StyledTableCell align="center">Order Code</StyledTableCell>
                                                        <StyledTableCell align="center">Price</StyledTableCell>
                                                        <StyledTableCell align="center">Shipping Cost</StyledTableCell>
                                                        <StyledTableCell align="center">Address</StyledTableCell>
                                                        <StyledTableCell align="center">Date Time</StyledTableCell>
                                                        <StyledTableCell align="center">Status</StyledTableCell>
                                                        <StyledTableCell align="center">Order Details</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                                        <StyledTableRow key={order._id} hover>
                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="center">{order.user.name}</TableCell>
                                                            <TableCell align="center">{order.code}</TableCell>
                                                            <TableCell align="center">£{order.subTotal}</TableCell>
                                                            <TableCell align="center">£{order.shippingCost}</TableCell>
                                                            <TableCell align="center">{order.address.houseNo}, {order.address.apartmentName}, {order.address.streetName}, {order.address.city}</TableCell>
                                                            <TableCell align="center">{order.createdAt}</TableCell>
                                                            <TableCell align="center">{tags(order.status)}</TableCell>
                                                            <TableCell align="center">
                                                                <div className="products__action">
                                                                    <motion.div whileHover={{ scale: 1.1 }}>
                                                                        <Link to={`/orders/${order._id}`}>
                                                                            <IconButton aria-label="edit" label="Edit" color="primary" style={{ marginRight: 5 }}>
                                                                                <LineWeightIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Link>
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
                                            <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={orders.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                        </TableContainer>
                                    ) : ordersNotFound)}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders
})

export default connect(mapStateToProps, { getOrdersFromApi })(OrderTable)
