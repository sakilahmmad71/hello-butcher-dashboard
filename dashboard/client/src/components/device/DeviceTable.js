import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Grid, TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';
import ContactsIcon from '@material-ui/icons/Contacts';

import './DeviceTable.css'
import Spinner from '../common/Spinner';
import { getDevicesFromApi } from '../../redux/actions/deviceAction'

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


const DeviceTable = (props) => {
    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    useEffect(() => {
        props.getDevicesFromApi()
    }, [])

    const { devices, loading, error } = props.devices

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, devices.length - page * rowsPerPage)

    let deviceLoading
    if (loading) {
        deviceLoading = <Spinner />
    }

    const deviceNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no Address to show. Make sure users have added their addresses.
    </div>)

    const tags = (tagName) => {
        if (tagName === 'android') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#a4c639", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'ios') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "var(--bg-dark)", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }
    }

    return (
        <>
            <div className="devicetable">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <div className="devicetable__header">
                            <ContactsIcon style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                            <Typography variant="h5" noWrap>All Registered Devices</Typography>
                        </div>

                        <div>
                            {deviceLoading ? deviceLoading : (
                                (!error && !loading && devices.length > 0) ? (
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="customized table">
                                            < TableHead >
                                                <TableRow>
                                                    <StyledTableCell align="left">#</StyledTableCell>
                                                    <StyledTableCell align="left">User Name</StyledTableCell>
                                                    <StyledTableCell align="left">UDID</StyledTableCell>
                                                    <StyledTableCell align="left">Platform</StyledTableCell>
                                                    <StyledTableCell align="left">Brand</StyledTableCell>
                                                    <StyledTableCell align="left">App Version</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {devices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device, index) => (
                                                    <StyledTableRow key={device._id} hover>
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{device.user.name}</TableCell>
                                                        <TableCell align="left">{device.udid}</TableCell>
                                                        <TableCell align="left">{tags(device.platform)}</TableCell>
                                                        <TableCell align="left">{device.brand}</TableCell>
                                                        <TableCell align="left">{device.appVersion}</TableCell>
                                                    </StyledTableRow>
                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                        <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={devices.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                    </TableContainer>
                                ) : deviceNotFound
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const stateMapsToProps = (state) => ({
    devices: state.devices,
})

export default connect(stateMapsToProps, { getDevicesFromApi })(DeviceTable)
