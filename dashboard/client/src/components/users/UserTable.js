import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TablePagination } from '@material-ui/core';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import CallIcon from '@material-ui/icons/Call';
import { connect } from 'react-redux';

import './UserTable.css';
import Status from './components/Status';
import UserDetailsModal from './UserDetailsModal';
import { getAllUsersFromApi } from '../../redux/actions/userAction'
import Spinner from '../common/Spinner';
import UserInfo from './UserInfo'

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

// Users Table Component
const UserTable = (props) => {
    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    const [modalUser, setModalUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        props.getAllUsersFromApi()
    }, [])

    const { users, loading, error } = props.users

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

    let userprofileLoading
    if (loading) {
        userprofileLoading = <Spinner />
    }

    const usersNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no users to show. Make sure there is some users registered.
    </div>)

    return (
        <>
            <div className="userstable">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        {/* Users Header Component */}
                        <div className="userstable__header">
                            <PeopleAltRoundedIcon style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187', }} />
                            <Typography variant="h5" noWrap>Users</Typography>
                        </div>
                        {/* Users Main Component */}
                        <div>
                            {userprofileLoading ? userprofileLoading : (
                                // Checking Users props loaded or not //
                                (!error && !loading && users.length > 0) ? (

                                    <TableContainer>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="left">#</StyledTableCell>
                                                    <StyledTableCell align="left">Name</StyledTableCell>
                                                    <StyledTableCell align="left">Email</StyledTableCell>
                                                    <StyledTableCell align="left">Phone</StyledTableCell>
                                                    <StyledTableCell align="left">Status</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                                    <StyledTableRow key={user._id} hover>
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{user.name}</TableCell>
                                                        <TableCell align="left"><UserInfo text={user.email} icon={<EmailOutlinedIcon size="small" />} /></TableCell>
                                                        <TableCell align="left"><UserInfo text={user.phone} icon={<CallIcon size="small" />} /></TableCell>
                                                        <TableCell align="left"><Status active={user.active} /></TableCell>
                                                    </StyledTableRow>
                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                        <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={users.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                    </TableContainer>
                                ) : usersNotFound
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
            {/* Rendering User Modal based on coditions. */}
            {showModal && (<UserDetailsModal showModal={showModal} setShowModal={setShowModal} modalUser={modalUser} setModalUser={setModalUser} />)}
        </>
    )
};

const stateMapsToProps = (state) => ({
    users: state.users
})

export default connect(stateMapsToProps, { getAllUsersFromApi })(UserTable);
