import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
    Stack,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {createCategory,editCategory} from '../../store/slice/category';
// ----------------------------------------------------------------------

export default function CreateForm(props) {
    const dispatch=useDispatch();
    const userEdit=props.dataEdit;
    const formValue={
        Name: userEdit?userEdit.name:'',
    };

    const initialValues=userEdit?{...formValue}:formValue;

    const UserSchema = Yup.object().shape({
        Name: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: UserSchema,
        onSubmit: async (values,{resetForm}) => {
            try {
                const res = await userEdit ?
                    dispatch(editCategory({
                        id:userEdit.id,
                        name: values.Name,
                    }))
                    :dispatch(createCategory({
                        name: values.Name,
                    }))
                ;
                unwrapResult(res);
                props.handleSubmit(res);
                resetForm();
            } catch (e) {
                console.log(e);
            }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete='Name'
                        type='text'
                        label='Name'
                        value={values.Name}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
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
