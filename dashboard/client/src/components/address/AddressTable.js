import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';
import ContactsIcon from '@material-ui/icons/Contacts';

import './AddressTable.css'
import Spinner from '../common/Spinner';
import { getAddressesFromApi } from '../../redux/actions/addressAction'

// Table Styles and App default styles
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


const AddressTable = (props) => {
    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    useEffect(() => {
        props.getAddressesFromApi()
    }, [])

    const { addresses, loading, error } = props.addresses

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, addresses.length - page * rowsPerPage)

    let addressLoading
    if (loading) {
        addressLoading = <Spinner />
    }

    const addressNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no Address to show. Make sure users have added their addresses.
    </div>)

    return (
        <>
            <div className="addresstable">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <div className="addresstable__header">
                            <ContactsIcon style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187', }} />
                            <Typography variant="h5" noWrap>All Users Addresses</Typography>
                        </div>

                        <div>
                            {addressLoading ? addressLoading : (
                                (!error && !loading && addresses.length > 0) ? (
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="customized table">
                                            < TableHead >
                                                <TableRow>
                                                    <StyledTableCell align="left">#</StyledTableCell>
                                                    <StyledTableCell align="left">User Name</StyledTableCell>
                                                    <StyledTableCell align="left">Flat/House No</StyledTableCell>
                                                    <StyledTableCell align="left">Flat/Apartment</StyledTableCell>
                                                    <StyledTableCell align="left">Street</StyledTableCell>
                                                    <StyledTableCell align="left">City</StyledTableCell>
                                                    <StyledTableCell align="left">Post Code</StyledTableCell>
                                                    {/* <StyledTableCell align="left">Created</StyledTableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {addresses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((address, index) => (
                                                    <StyledTableRow key={address._id} hover>
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{address.user.name}</TableCell>
                                                        <TableCell align="left">{address.houseNo}</TableCell>
                                                        <TableCell align="left">{address.apartmentName}</TableCell>
                                                        <TableCell align="left">{address.streetName}</TableCell>
                                                        <TableCell align="left">{address.city}</TableCell>
                                                        <TableCell align="left">{address.postcodePrefix + '-' + address.postcodeSuffix}</TableCell>
                                                        {/* <TableCell align="left">{address.createdAt}</TableCell> */}
                                                    </StyledTableRow>
                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                        <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={addresses.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                    </TableContainer>
                                ) : addressNotFound
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const stateMapsToProps = (state) => ({
    addresses: state.addresses,
    errors: state.errors
})

export default connect(stateMapsToProps, { getAddressesFromApi })(AddressTable)
