import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
    Stack,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { postProduct } from '../../store/slice/products';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function CreateForm() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [img,setImg]=useState();
    const ProductSchema = Yup.object().shape({
        Name: Yup.string().required(),
        Description: Yup.string().required(),
        Price: Yup.number().required(),
        PriceSale: Yup.number(),
        CategoryId: Yup.number().required(),
        Image: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            Name: '',
            Description: '',
            Price: 0.0,
            PriceSale:0.0,
            CategoryId:'',
            RegionId:'',
            Image:''
        },
        validationSchema: ProductSchema,
        onSubmit: async (values,{resetForm}) => {
            try {
                const res = await dispatch(postProduct({
                    Name: values.Name,
                    Description: values.Description,
                    Price: values.Price,
                    PriceSale: values.PriceSale,
                    CategoryId: values.CategoryId,
                    RegionId: values.RegionId,
                    Image:values.Image
                }));
                unwrapResult(res);
                resetForm();
                navigate('/dashboard', { replace: true });
            } catch (e) {
                console.log(e);
            }
        }
    });

    const showPreview=(e)=>{
        if(e.target.files&& e.target.files[0]){
            let imageFile=e.target.files[0];
            const reader=new FileReader();
            reader.onload= x=>{
                setImg({
                    imageFile,
                    imageSrc:x.target.result
                });
            };
            reader.readAsDataURL((imageFile));

        }
    };

    console.log(img);

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete='productName'
                        type='text'
                        label='Name'
                        value={values.Name}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                    />
                    <TextField
                        fullWidth
                        autoComplete='productDescription'
                        type='text'
                        label='Description'
                        value={values.Description}
                        {...getFieldProps('Description')}
                        error={Boolean(touched.Description && errors.Description)}
                        helperText={touched.Description && errors.Description}
                    />
                    <TextField
                        fullWidth
                        accept="image/*"
                        autoComplete='productImage'
                        type='file'
                        value={values.Image}
                        {...getFieldProps('Image')}
                        error={Boolean(touched.Image && errors.Image)}
                        helperText={touched.Image && errors.Image}
                        onChange={showPreview}
                    />
                    <TextField
                        fullWidth
                        autoComplete='Price'
                        type='number'
                        label='Price'
                        value={values.Price}
                        {...getFieldProps('Price')}
                        error={Boolean(touched.Price && errors.Price)}
                        helperText={touched.Price && errors.Price}
                    />
                    <TextField
                        fullWidth
                        autoComplete='PriceSale'
                        type='number'
                        label='PriceSale'
                        value={values.PriceSale}
                        {...getFieldProps('PriceSale')}
                        error={Boolean(touched.PriceSale && errors.PriceSale)}
                        helperText={touched.PriceSale && errors.PriceSale}
                    />
                    <TextField
                        fullWidth
                        autoComplete='CategoryId'
                        type='number'
                        label='CategoryId'
                        value={values.CategoryId}
                        {...getFieldProps('CategoryId')}
                        error={Boolean(touched.CategoryId && errors.CategoryId)}
                        helperText={touched.CategoryId && errors.CategoryId}
                    />
                    <TextField
                        fullWidth
                        autoComplete='RegionId'
                        type='number'
                        label='RegionId'
                        value={values.RegionId}
                        {...getFieldProps('RegionId')}
                        error={Boolean(touched.RegionId && errors.RegionId)}
                        helperText={touched.RegionId && errors.RegionId}
                    />
                </Stack>

                <LoadingButton
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    loading={isSubmitting}
                >
                    Submit
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
