import * as Yup from 'yup';
import {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useFormik, Form, FormikProvider} from 'formik';
import {Icon} from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
    Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../../store/slice/loginAndLogout';
import {unwrapResult} from '@reduxjs/toolkit';
import {setSessionStorage} from '../../../utils/sessionStorage';

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6).required('the password must be at least 6 characters')
    });

    const formik = useFormik({
        initialValues: {
            email: '', password: '', remember: true
        },
        validationSchema: LoginSchema, onSubmit: async (values, {resetForm}) => {
            try {
                const res = await dispatch(userLogin({
                    email: values.email, password: values.password
                }));
                unwrapResult(res);
                const user=res.payload;
                setSessionStorage(user);
                resetForm();
                navigate('/dashboard/app', {replace: true});
            } catch (e) {
                console.log(e);
            }
        }
    });

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (<FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    value={values.email}
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />

                <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={values.password}
                    {...getFieldProps('password')}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                                <Icon icon={showPassword ? eyeFill : eyeOffFill}/>
                            </IconButton>
                        </InputAdornment>)
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <FormControlLabel
                    control={<Checkbox {...getFieldProps('remember')} checked={values.remember}/>}
                    label="Remember me"
                />

                <Link component={RouterLink} variant="subtitle2" to="#">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Login
            </LoadingButton>
        </Form>
    </FormikProvider>);
}
