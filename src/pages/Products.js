import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
// material
import {Button, Container, Stack, TableCell, TablePagination, TableRow, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import {
    ProductSort,
    ProductList,
    ProductFilterSidebar
} from '../components/_dashboard/products';
//
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, getProductById} from '../store/slice/products';
import {unwrapResult} from '@reduxjs/toolkit';
import {Link as RouterLink} from 'react-router-dom';
import {Icon} from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import CreateForm from '../components/products/CreateForm';
import CreateFormImage from '../components/products/CreateFormImage';
import {filter} from 'lodash';

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


export default function EcommerceShop() {
    const [openFilter, setOpenFilter] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openImageForm, setOpenImageForm] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [submitImage, setSubmitImage] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [order] = useState('asc');
    const [orderBy] = useState('name');
    const [filterName] = useState('');
    const store=useSelector(state=>state.products);

    useEffect(() => {
        fetchData();
    }, [submitImage, isEdit, isDelete]);


    const fetchData = async () => {
        try {
            const res = await dispatch(getProduct());
            setData(res.payload);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const {resetForm, handleSubmit} = formik;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log(parseInt(event.target.value, 10));
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        handleSubmit();
        resetForm();
    };


    const handleFormSubmit = async (value) => {
        setOpenForm(false);
        setDataEdit({});
        value && setIsEdit(value);
        setOpenImageForm(true);
    };

    const handleSubmitImage = (value) => {
        setSubmitImage(value);
        setOpenImageForm(false);
    };

    const handleDeleteProduct=(value)=>{
        value&&setIsDelete(value);
    };

    const handleClickProductName = async (id) => {
        try {
            const res = await dispatch(getProductById(id));
            setDataEdit(res.payload);
            setOpenForm(true);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    const filteredProducts = applySortFilter(data, getComparator(order, orderBy), filterName);

    const dataOfPage = filteredProducts.filter(item => item.product.name !== undefined)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Page title="Dashboard: Products | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" sx={{mb: 5}}>
                        Products
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill}/>}
                        onClick={() => setOpenForm(!openForm)}
                    >
                        New Product
                    </Button>
                </Stack>

                {openForm && <CreateForm handleFormSubmit={handleFormSubmit} dataEdit={dataEdit}/>}
                {openImageForm && <CreateFormImage submitImage={handleSubmitImage} id={store.postData.id}/>}
                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{mb: 5}}
                >
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{my: 1}}>
                        <ProductFilterSidebar
                            formik={formik}
                            isOpenFilter={openFilter}
                            onResetFilter={handleResetFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort/>
                    </Stack>
                </Stack>

                <ProductList
                    items={dataOfPage}
                    handleDeleteProduct={handleDeleteProduct}
                    handleClickProductName={handleClickProductName}/>
                {emptyRows > 0 && (
                    <TableRow style={{height: 53 * emptyRows}}>
                        <TableCell colSpan={6}/>
                    </TableRow>
                )}
                <TablePagination
                    rowsPerPageOptions={[8, 16, 24]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        </Page>
    );
}
