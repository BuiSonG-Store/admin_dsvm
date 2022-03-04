import {filter} from 'lodash';
import {Icon} from '@iconify/react';
import {useEffect, useState} from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import {Link as RouterLink} from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../components/_dashboard/user';
//
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {getUserById, getUsers} from '../store/slice/user';
import CreateForm from '../components/users/CreateForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'phoneNumber', label: 'Phone Number', alignRight: false},
    {id: 'facebook', label: 'FaceBook', alignRight: false},
    {id: 'gmail', label: 'Gmail', alignRight: false},
    {id: 'address', label: 'Address', alignRight: false},
    {id: 'role', label: 'Role', alignRight: false},
    {id: ''}
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function User() {
    const [data,setData]=useState([]);
    const dispatch=useDispatch();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openForm,setOpenForm]=useState(false);
    const [dataEdit,setDataEdit]=useState([]);
    const [isEdit,setIsEdit]=useState([]);
    const [isDelete,setIsDelete]=useState([]);

    useEffect(()=>{
        fetchData();
    },[isEdit,isDelete]);

    const fetchData = async () => {
        try {
            const res = await dispatch(getUsers());
            setData(res.payload);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSubmit=(value)=>{
        setOpenForm(false);
        setDataEdit({});
        value && setIsEdit(value);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const clickButtonEdit=async(id)=>{
        try {
            const res = await dispatch(getUserById(id));
            setDataEdit(res.payload);
            setOpenForm(true);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete=(value)=>{
        setSelected([]);
        value&&setIsDelete(value);
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill}/>}
                        onClick={()=>setOpenForm(!openForm)}
                    >
                        New User
                    </Button>
                </Stack>

                {openForm&&<CreateForm  dataEdit={dataEdit} handleSubmit={handleSubmit}/>}

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        selected={selected}
                        handleDelete={handleDelete}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={data.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {id, name, role, phoneNumber, faceBook, gmail,userAddress} = row;
                                            const isItemSelected = selected.indexOf(id) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{phoneNumber}</TableCell>
                                                    <TableCell align="left">{faceBook}</TableCell>
                                                    <TableCell align="left">{gmail}</TableCell>
                                                    <TableCell align="left">{userAddress}</TableCell>
                                                    <TableCell align="left">{role}</TableCell>

                                                    <TableCell align="right">
                                                        <UserMoreMenu userId={id} clickButtonEdit={clickButtonEdit}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                                <SearchNotFound searchQuery={filterName}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
