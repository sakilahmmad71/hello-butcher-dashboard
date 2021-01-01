import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, Button, Chip, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom'
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { connect } from 'react-redux';

import './NotificationTable.css'
import { getNotificationsFromApi } from '../../redux/actions/notificationAction'
import Spinner from '../common/Spinner';

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

const NotificationTable = (props) => {
    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    useEffect(() => {
        props.getNotificationsFromApi()
    }, [])

    const { notifications, loading, error } = props.notifications

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, notifications.length - page * rowsPerPage)

    let notificationLoading
    if (loading) {
        notificationLoading = <Spinner />
    }

    const notificationNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no notifications show. Make sure you have made some notifications.
    </div>)

    // Tags Colours
    const tags = (tagName) => {
        if (tagName === 'all') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#fc3d39", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'ios') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "var(--bg-dark)", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

        if (tagName === 'android') {
            return (<Chip label={tagName.toUpperCase()} size="small" clickable style={{ background: "#a4c639", color: "white", fontSize: 10, fontWeight: 'bold' }} />)
        }

    }

    return (
        <div className="notificationtable">
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <div className="notificationtable__header">
                        <NotificationsActiveOutlinedIcon
                            style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                        <Typography variant="h5" noWrap>Notifications</Typography>
                    </div>

                    <Grid container >
                        <Grid item md={9} sm={9}></Grid>
                        <Grid item md={3} sm={3} style={{ marginBottom: 30 }}><Link to={{ pathname: '/add-notification', props: { ...props } }} style={{ textDecoration: 'none' }}><Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}> Add New Notification</Button></Link></Grid>
                    </Grid>

                    <div>
                        {/* Notification loading */}
                        {notificationLoading ? notificationLoading : (
                            (!error && !loading && notifications.length > 0) ? (
                                <TableContainer>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left">#</StyledTableCell>
                                                <StyledTableCell align="left">Title</StyledTableCell>
                                                <StyledTableCell align="left">Details</StyledTableCell>
                                                <StyledTableCell align="left">Type</StyledTableCell>
                                                <StyledTableCell align="left">Date - Time</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notification, index) => (
                                                <StyledTableRow key={notification._id} hover>
                                                    <TableCell align="left">{index + 1}</TableCell>
                                                    <TableCell align="left">{notification.title}</TableCell>
                                                    <TableCell align="left" style={{ maxWidth: 500 }}>{notification.details}</TableCell>
                                                    <TableCell align="left">{tags(notification.platform)}</TableCell>
                                                    <TableCell align="left">{notification.createdAt}</TableCell>
                                                </StyledTableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={notifications.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                </TableContainer>
                            ) : notificationNotFound
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

const stateMapsToProps = (state) => ({
    notifications: state.notifications
})

export default connect(stateMapsToProps, { getNotificationsFromApi })(NotificationTable)
