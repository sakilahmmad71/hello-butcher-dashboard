import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, Button, Chip, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { connect } from 'react-redux';

import './PostcodeTable.css'
import Spinner from '../common/Spinner';
import { getPostcodesFromApi } from '../../redux/actions/postcodeAction'

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


const PostcodeTable = (props) => {
    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    useEffect(() => {
        props.getPostcodesFromApi()
    }, [])

    const { postcodes, loading, error } = props.postcodes

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, postcodes.length - page * rowsPerPage)

    let postcodesLoading
    if (loading) {
        postcodesLoading = <Spinner />
    }

    const postcodesNotFound = (<div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-warning)', padding: 20 }}>
        There is no post code to show. Make sure you have made several available post codes.
    </div>)

    return (
        <div>
            <div className="postcodetable">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <div className="postcodetable__header">
                            <PostAddIcon
                                style={{ fontSize: 40, background: 'white', padding: 10, borderRadius: '50%', marginRight: 20, boxShadow: '0 2px 20px -5px #6ab187' }} />
                            <Typography variant="h5" noWrap>Post Codes</Typography>
                        </div>

                        <Grid container >
                            <Grid item md={9} sm={9}></Grid>
                            <Grid item md={3} sm={3} style={{ marginBottom: 30 }}><Link to={{ pathname: '/add-postcode', props: { ...props } }} style={{ textDecoration: 'none' }}><Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>Add New Post Code</Button></Link></Grid>
                        </Grid>

                        <div>
                            {/* Notification loading */}
                            {postcodesLoading ? postcodesLoading : (
                                (!error && !loading && postcodes.length > 0) ? (
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">#</StyledTableCell>
                                                    <StyledTableCell align="center">Post Code Prefix</StyledTableCell>
                                                    <StyledTableCell align="center">Shipping Cost</StyledTableCell>
                                                    <StyledTableCell align="center">Date - Time</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postcodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((postcode, index) => (
                                                    <StyledTableRow key={postcode._id} hover>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="center">{postcode.postcodePrefix}</TableCell>
                                                        <TableCell align="center" style={{ color: "var(--bg-info)" }}>£ {postcode.shippingCost}</TableCell>
                                                        <TableCell align="center">{postcode.createdAt}</TableCell>
                                                    </StyledTableRow>
                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                        <TablePagination rowsPerPageOptions={[15, 25, 50]} component="div" count={postcodes.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                                    </TableContainer>
                                ) : postcodesNotFound
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const stateMapsToProps = (state) => ({
    postcodes: state.postcodes
})

export default connect(stateMapsToProps, { getPostcodesFromApi })(PostcodeTable)

