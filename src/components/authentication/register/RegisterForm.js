import * as Yup from 'yup';
import {useState} from 'react';
import {Icon} from '@iconify/react';
import {useFormik, Form, FormikProvider} from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {useNavigate} from 'react-router-dom';
// material
import {Stack, TextField, IconButton, InputAdornment} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {userRegister} from '../../../store/slice/register';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {setSessionStorage} from '../../../utils/sessionStorage';

// ----------------------------------------------------------------------

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const RegisterSchema = Yup.object().shape({
        Name: Yup.string().required(),
        AccountPassword: Yup.string().required().min(6),
        PhoneNumber: Yup.string().required().max(10),
        Gmail: Yup.string().required().email(),
        Role: Yup.string().default('user'),
    });


    const formik = useFormik({
        initialValues: {
            Name: '',
            AccountPassword: '',
            PhoneNumber: '',
            Gmail: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values,{resetForm}) => {
            try {
                const res=await  dispatch(userRegister({
                    name: values.Name,
                    accountPassword: values.AccountPassword,
                    phoneNumber: values.PhoneNumber,
                    gmail: values.Gmail
                }));
                unwrapResult(res);
                const user=res.payload;
                setSessionStorage(user);
                resetForm();
                navigate('/dashboard/app', {replace: true});
            }catch (e) {
                console.log(e);
            }

        }
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            {...getFieldProps('Name')}
                            error={Boolean(touched.Name && errors.Name)}
                            helperText={touched.Name && errors.Name}
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            {...getFieldProps('PhoneNumber')}
                            error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
                            helperText={touched.PhoneNumber && errors.PhoneNumber}
                        />
                    </Stack>

                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('Gmail')}
                        error={Boolean(touched.Gmail && errors.Gmail)}
                        helperText={touched.Gmail && errors.Gmail}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('AccountPassword')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill}/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.AccountPassword && errors.AccountPassword)}
                        helperText={touched.AccountPassword && errors.AccountPassword}
                    />

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Register
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
