import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
    ProductSort,
    ProductList,
    ProductCartWidget,
    ProductFilterSidebar
} from '../components/_dashboard/products';
//
// import PRODUCTS from '../_mocks_/products';
import { useDispatch } from 'react-redux';
import { getProduct } from '../store/slice/products';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import CreateForm from '../components/products/CreateForm';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
    const [openFilter, setOpenFilter] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(getProduct());
                setData(res.payload);
                unwrapResult(res);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    console.log(data);

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

    const { resetForm, handleSubmit } = formik;

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

    return (
        <Page title='Dashboard: Products | Minimal-UI'>
            <Container>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
                    <Typography variant='h4' sx={{ mb: 5 }}>
                        Products
                    </Typography>
                    <Button
                        variant='contained'
                        component={RouterLink}
                        to='#'
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => setOpenForm(!openForm)}
                    >
                        New Product
                    </Button>
                </Stack>
                {openForm && <CreateForm />}
                <Stack
                    direction='row'
                    flexWrap='wrap-reverse'
                    alignItems='center'
                    justifyContent='flex-end'
                    sx={{ mb: 5 }}
                >
                    <Stack direction='row' spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                            formik={formik}
                            isOpenFilter={openFilter}
                            onResetFilter={handleResetFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

                <ProductList products={data} />
                <ProductCartWidget />
            </Container>
        </Page>
    );
}
