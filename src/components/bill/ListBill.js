import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

export default function ListBill({data, name, handleCloseList}) {
    return (
        <TableContainer component={Paper}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4" gutterBottom>
                    {name}
                </Typography>
            </Stack>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Product Name</TableCell>
                        <TableCell align="right">Product Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Oder Time</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .reduce((prev, next) => {
                            const isExist = prev.findIndex(
                                (item) => item.id === next.id
                            );
                            if (isExist < 0) {
                                return prev.concat(next);
                            }
                            const ls = prev.map((item, index) => {
                                if (index === isExist) {
                                    return {
                                        ...item,
                                        productName: [item.productName, next.productName],
                                        productPrice: [
                                            item.productPrice,
                                            next.productPrice,
                                        ],
                                    };
                                }
                                return item;
                            });
                            console.log(ls);
                            return ls;
                        }, [])
                        .map((row) => {
                            const {
                                total,
                                oderTime,
                                status,
                                productName,
                                productPrice,
                                userName,
                                phoneNumber,
                                address,
                            } = row;
                            return (
                                <TableRow
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {userName}
                                    </TableCell>
                                    <TableCell align="right">{phoneNumber}</TableCell>
                                    <TableCell align="right">{address}</TableCell>
                                    <TableCell align="right">{productName}</TableCell>
                                    <TableCell align="right">{productPrice}</TableCell>
                                    <TableCell align="right">{total}</TableCell>
                                    <TableCell align="right">{oderTime}</TableCell>
                                    <TableCell align="right">{status}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleCloseList}
            >
                Close
            </Button>
        </TableContainer>
    );
}
