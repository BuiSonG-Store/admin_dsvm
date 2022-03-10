import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
    Stack,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import {createRegion} from '../../store/slice/region';
import axios from 'axios';
// ----------------------------------------------------------------------


export default function CreateForm(props) {
    const [provinces, setProvinces] = useState([]);
    const dispatch=useDispatch();
    const userEdit=props.dataEdit;
    const formValue={
        Name: userEdit?userEdit.name:'',
    };
    useEffect(() => {
        fetchData();
    
    }, []);
    
    const fetchData = async () => {
        try {
            const res = await axios.get('https://provinces.open-api.vn/api/?depth=3');
            let pro = res.data.map((value) => ({ name: value.name, code: value.code }));
            setProvinces(pro);
        } catch (e) {
            console.log(e);
        }
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
                const res = dispatch(createRegion({name: values.Name,}))
                ;
                unwrapResult(res);
                props.handleSubmit(res);
                resetForm();
            } catch (e) {
                console.log(e);
            }
        }

    });

    const renderProvinces = (values,getFieldProps) => {
        return (
            <Stack spacing={3}>
                <InputLabel id="demo-simple-select-label">Tỉnh / thành</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.Name}
                    // onChange={(e) => handleSelectProvince(e)}
                    {...getFieldProps('Name')}

                >
                    {provinces.map((province, index) => (
                        <MenuItem key={index} value={province.name}>{province.name}</MenuItem>
                    ))}
                </Select>
            </Stack>
        //   <div className="col-md-4 mb-3">
        //     <label htmlFor="country">Tỉnh / thành</label>
        //     <select
        //       className="custom-select d-block w-100"
        //       id="country"
        //       required=""
        //       value={selectProvince}
        //       onChange={(e) => {
        //         setSelectProvince(e.target.value);
        //       }}
        //     >
        //       <option value="">Choose...</option>
        //       {provinces.map((province, index) => (
        //         <option key={province.code} value={index}>
        //           {province.name}
        //         </option>
        //       ))}
        //     </select>
        //   </div>
        );
    };

    const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                {renderProvinces(values,getFieldProps)}

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
