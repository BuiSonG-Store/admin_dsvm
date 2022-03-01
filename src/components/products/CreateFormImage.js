import {useFormik, Form, FormikProvider} from 'formik';
// material
import {
    Button,
    Stack,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { useState} from 'react';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {postProductImage} from '../../store/slice/productImage';
// ----------------------------------------------------------------------

export default function CreateFormImage(props) {
    const [values, setValues] = useState(null);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            Image: ''
        },
        onSubmit: async () => {
            const formData = new FormData();
            formData.append('ProductId',props.id );
            for (let i = 0; i < values.length; i++) {
                formData.append('Image', values[i]);
            }
            try {
                const res = await dispatch(postProductImage(formData));
                unwrapResult(res);
                props.submitImage({res:res.payload});
            } catch (e) {
                console.log(e);
            }
        }
    });

    const handleFileChange = (e) => {
        setValues(e.target.files);
    };

    const {isSubmitting, handleSubmit} = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <Stack spacing={1}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            accept="/image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </Button>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Submit
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
