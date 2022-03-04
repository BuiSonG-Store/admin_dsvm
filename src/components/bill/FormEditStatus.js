import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
    InputLabel, MenuItem, Select,
    Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {editBill} from '../../store/slice/bill';
// ----------------------------------------------------------------------

export default function FormEditStatus(props) {
    const dispatch=useDispatch();

    const userEdit=props.dataEdit;

    const formValue={
        Status: userEdit?userEdit.status:'',
    };

    const initialValues=formValue;

    const UserSchema = Yup.object().shape({
        Status: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: UserSchema,
        onSubmit: async (values,{resetForm}) => {
            try {
                const res = await dispatch(editBill({
                    id:userEdit.id,
                    status:values.Status
                }));
                unwrapResult(res);
                props.handleSubmit(res);
                resetForm();
            } catch (e) {
                console.log(e);
            }
            resetForm();
        }
    });

    const { errors, touched,values, isSubmitting, handleSubmit,getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.Status}
                        label="Age"
                        {...getFieldProps('Status')}
                        error={Boolean(touched.Status && errors.Status)}
                        helperText={touched.Status && errors.Status}
                    >
                        <MenuItem value={'Đang xác nhận'}>Đang xác nhận</MenuItem>
                        <MenuItem value={'Đang giao'}>Đang giao</MenuItem>
                        <MenuItem value={'Giao Thành Công'}>Giao Thành Công</MenuItem>
                        <MenuItem value={'Giao Thất Bại'}>Giao Thất Bại</MenuItem>
                    </Select>
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
