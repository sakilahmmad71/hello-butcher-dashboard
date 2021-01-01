import React from 'react';
import { motion } from 'framer-motion';
import {
    withStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress,
} from '@material-ui/core';
import { Done, Face } from '@material-ui/icons';

import './Sales.css';
import tableData from './tableData';
import Products from './components/Products';
import Buyer from './components/Buyer';
import SalesHeader from './SalesHeader';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontSize: 18,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {},
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 800,
        minHeight: 600,
    },
});

const Sales = ({ title }) => {
    const classes = useStyles();

    const handleDelete = () => {
        console.info('You clicked the check icon.');
    };

    return (
        <div className="sales">
            <SalesHeader title={title} />
            <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                Products
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Buyer
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Total
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Status
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Stock
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((product) => (
                            <StyledTableRow key={product.skew} hover>
                                <StyledTableCell component="th" scope="row">
                                    <Products
                                        skew={product.skew}
                                        name={product.name}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Buyer
                                        email={product.email}
                                        date={product.date}
                                    />
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    style={{
                                        color: '#6ab187',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    $ {product.price}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                    >
                                        <Chip
                                            label={product.status}
                                            clickable
                                            color={
                                                product.status === 'success'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            variant="outlined"
                                        />
                                    </motion.div>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {product.sold} / {product.remain}
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            (product.sold / product.remain) *
                                            100
                                        }
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Sales;
