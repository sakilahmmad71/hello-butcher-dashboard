import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, InputLabel, Select, MenuItem, Button, Chip, Container } from '@material-ui/core';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import CallIcon from '@material-ui/icons/Call';

import './EditOrder.css'
import { getOrderByIdFromApi, updateOrderToApi } from '../../redux/actions/orderAction'
import Spinner from '../common/Spinner'

// Table row and column styling
const StyledTableCell = withStyles((theme) => ({
    head: { backgroundColor: theme.palette.common.white, color: theme.palette.common.black, fontSize: 16, fontWeight: 900 },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: { '&:nth-of-type(even)': { backgroundColor: theme.palette.action.hover } }
}))(TableRow);

const useStyles = makeStyles({ table: { minWidth: 600, minHeight: 80 } });

const EditOrder = (props) => {
    const classes = useStyles();
    const { id } = useParams()

    useEffect(() => {
        props.getOrderByIdFromApi(id)
    }, [])

    const { order, loading, error } = props.order

    const [orderStatus, setOrderStatus] = useState("")


    const handleOrderStatus = (event) => {
        setOrderStatus(event.target.value);
    };

    const handleOrderStatusSubmit = (e, id) => {
        e.preventDefault()
        const newStatus = { status: orderStatus === "" ? order.status : orderStatus }

        props.updateOrderToApi(id, newStatus)

        if (!error && !loading) {
            props.history.push('/orders')
        }
    }

    const handleCancelUpdateOrder = () => {
        if (!error && !loading) {
            props.history.push('/orders')
        }
    }

    let orderLoading
    if (loading) {
        orderLoading = <Spinner />
    }

    const orderNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no orders to show. Make sure some orders created.
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

    return (
        <>
            <div className="editorder">
                <div className="editorder__main">
                    <Grid container>
                        <Grid item md={1} sm={1} xs={12}></Grid>
                        <Grid item md={10} sm={10} xs={12}>
                            <div>
                                {orderLoading ? orderLoading : (
                                    (!error && !loading && order) ? (
                                        <div>
                                            <div className="editorder__header">
                                                <StorefrontOutlinedIcon style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                                                <Typography variant="h5" noWrap>Order Details</Typography>
                                            </div>

                                            {/* Users Details */}
                                            <div className="editorder__user">
                                                {order.user && (
                                                    <Paper>
                                                        <div className="editorder__user--profile">
                                                            <div className="editorder__user--avatar">
                                                                <Avatar />
                                                            </div>
                                                            <div className="editorder__user--details">
                                                                <h3 style={{ textAlign: "center" }}>{order.user.name}</h3>
                                                                <Typography variant="subtitle1" component="p" align="center">
                                                                    <div className="editorder__user--text">
                                                                        <EmailOutlinedIcon /> {" "}{order.user.email}
                                                                    </div>
                                                                </Typography>
                                                                <Typography variant="subtitle1" component="p" align="center" >
                                                                    <div className="editorder__user--text">
                                                                        <CallIcon /> {" "}{order.user.phone}
                                                                    </div>
                                                                </Typography>
                                                            </div>
                                                        </div>

                                                        <TableContainer>
                                                            <Table className={classes.table} aria-label="customized table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <StyledTableCell align="center">Flat/House No</StyledTableCell>
                                                                        <StyledTableCell align="center">Flat/Apartment</StyledTableCell>
                                                                        <StyledTableCell align="center">Street</StyledTableCell>
                                                                        <StyledTableCell align="center">City</StyledTableCell>
                                                                        <StyledTableCell align="center">Post Code</StyledTableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <StyledTableRow hover>
                                                                        <TableCell align="center">{order.address.houseNo}</TableCell>
                                                                        <TableCell align="center">{order.address.apartmentName}</TableCell>
                                                                        <TableCell align="center">{order.address.streetName}</TableCell>
                                                                        <TableCell align="center">{order.address.city}</TableCell>
                                                                        <TableCell align="center">{order.address.postcodePrefix + order.address.postcodeSuffix}</TableCell>
                                                                    </StyledTableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Paper>
                                                )}
                                            </div>

                                            {/* Products Details */}
                                            <div className="editorder__products">
                                                {order.products && order.products.map(singleProduct => (
                                                    <Paper>
                                                        <div className="editorder__product">
                                                            <div >
                                                                {/* .replace(/localhost/g, "198.13.36.60") */}
                                                                <img className="editorder__productimage" src={singleProduct.product.file.replace(/localhost/g, "198.13.36.60")} alt="Product Image" />
                                                            </div>
                                                            <div className="editorder__productdetail">
                                                                <h4>{singleProduct.product.title}</h4>
                                                                <div className="editorder__productdetail--productcode">
                                                                    <h5>{singleProduct.product.code}</h5>
                                                                    <p><small>{tags(singleProduct.product.category)}</small></p>
                                                                </div>
                                                                <h4>£{singleProduct.product.price}</h4>
                                                                <p>{singleProduct.product.description}</p>
                                                                <div className="editorder__productdetail--options">
                                                                    <div className="options">
                                                                        {singleProduct.options.map(option => (
                                                                            <FormControl component="fieldset" key={option.values[parseInt(option.selected)]} style={{ marginRight: 30 }}>
                                                                                <FormLabel component="legend">{option.title}</FormLabel>
                                                                                <FormControlLabel value={option.values[parseInt(option.selected)]} control={<Radio checked />} label={option.values[parseInt(option.selected)]} />
                                                                            </FormControl>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                ))}
                                            </div>

                                            {/* Order Update status */}
                                            <div>
                                                <div className="order__status">
                                                    <form onSubmit={(e) => handleOrderStatusSubmit(e, order._id)}>
                                                        <FormControl fullWidth variant="outlined" required className={classes.margin} margin="normal">
                                                            <InputLabel id="status-select-label">Order Status</InputLabel>
                                                            <Select labelId="status-select-label" defaultValue={order.status} onChange={handleOrderStatus} label="Order Status">
                                                                <MenuItem value="requested">REQUESTED</MenuItem>
                                                                <MenuItem value="accepted">ACCEPTED</MenuItem>
                                                                <MenuItem value="delivered">DELIVERED</MenuItem>
                                                                <MenuItem value="cancelled">CANCELLED</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <Button fullWidth type="submit" variant="contained" color="primary">Update Order</Button>
                                                        <Button fullWidth variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={handleCancelUpdateOrder}>Cancel</Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    ) : orderNotFound)}
                            </div>
                        </Grid>
                        <Grid item md={1} sm={1} xs={12}></Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    order: state.order
})

export default connect(mapStateToProps, { getOrderByIdFromApi, updateOrderToApi })(EditOrder)
