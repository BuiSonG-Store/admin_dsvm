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
import {editUser} from '../../store/slice/user';
import {userRegister} from '../../store/slice/register';
// ----------------------------------------------------------------------

export default function CreateForm(props) {
    const dispatch=useDispatch();
    const userEdit=props.dataEdit;
    const formValue={
        Name: userEdit?userEdit.name:'',
        AccountPassword: userEdit?userEdit.accountPassword:'',
        PhoneNumber: userEdit?userEdit.phoneNumber:'',
        Gmail:userEdit?userEdit.gmail:'',
    };

    const initialValues=userEdit?{...formValue,FaceBook:userEdit.facebook,UserAddress: userEdit.userAddress}:formValue;

    const UserSchema = Yup.object().shape({
        Name: Yup.string().required(),
        AccountPassword: Yup.string().required(),
        PhoneNumber: Yup.string().required().max(10),
        UserAddress: Yup.string().required(),
        Gmail: Yup.string().required().email(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: UserSchema,
        onSubmit: async (values,{resetForm}) => {
            try {
                const res = await userEdit ?
                    dispatch(editUser({
                        id:userEdit.id,
                        name: values.Name,
                        accountPassword: values.AccountPassword,
                        phoneNumber: values.PhoneNumber,
                        userAddress: values.UserAddress,
                        facebook: values.FaceBook,
                        gmail: values.Gmail,
                    }))
                    :dispatch(userRegister({
                        name: values.Name,
                        accountPassword: values.AccountPassword,
                        phoneNumber: values.PhoneNumber,
                        gmail: values.Gmail,
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
                    <TextField
                        fullWidth
                        autoComplete='AccountPassword'
                        type='password'
                        label='Password'
                        value={values.AccountPassword}
                        {...getFieldProps('AccountPassword')}
                        error={Boolean(touched.AccountPassword && errors.AccountPassword)}
                        helperText={touched.AccountPassword && errors.AccountPassword}
                    />
                    <TextField
                        fullWidth
                        autoComplete='PhoneNumber'
                        type='text'
                        label='PhoneNumber'
                        value={values.PhoneNumber}
                        {...getFieldProps('PhoneNumber')}
                        error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
                        helperText={touched.PhoneNumber && errors.PhoneNumber}
                    />

                    {userEdit&&<><TextField
                        fullWidth
                        autoComplete='UserAddress'
                        type='text'
                        label='Address'
                        value={values.UserAddress}
                        {...getFieldProps('UserAddress')}
                        error={Boolean(touched.UserAddress && errors.UserAddress)}
                        helperText={touched.UserAddress && errors.UserAddress}
                    />
                    <TextField
                        fullWidth
                        autoComplete='FaceBook'
                        type='text'
                        label='FaceBook'
                        value={values.FaceBook}
                        {...getFieldProps('FaceBook')}
                        error={Boolean(touched.FaceBook && errors.FaceBook)}
                        helperText={touched.FaceBook && errors.FaceBook}
                    /></>}
                    <TextField
                        fullWidth
                        autoComplete='Gmail'
                        type='text'
                        label='Gmail'
                        value={values.Gmail}
                        {...getFieldProps('Gmail')}
                        error={Boolean(touched.Gmail && errors.Gmail)}
                        helperText={touched.Gmail && errors.Gmail}
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
