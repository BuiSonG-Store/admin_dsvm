import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
    InputLabel, MenuItem, Select,
    Stack,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {editProduct, postProduct} from '../../store/slice/products';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';
import {getRegions} from '../../store/slice/region';
import {getCategory} from '../../store/slice/category';
import {getProvinces} from '../../store/slice/province';
import {getDvt} from '../../store/slice/dvt';
import {getWeight} from '../../store/slice/weight';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// ----------------------------------------------------------------------

export default function CreateForm(props) {
    const [categories, setCategories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [dvts, setDvt] = useState([]);
    const [checkHotProduct] = useState([true, false]);
    const [typeOfWeight, setTypeOfWeight] = useState('g');
    const [weights, setWeight] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const dispatch=useDispatch();
    const productEdit=props.dataEdit.product;

    const [bodyDes,setBodyDes] = useState('');

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const res = await dispatch(getCategory());
            const resRegion = await dispatch(getRegions());
            const resDvt = await dispatch(getDvt());
            const resWeight=await dispatch(getWeight());
            setDvt(resDvt.payload);
            setWeight(resWeight.payload);
            setCategories(res.payload);
            unwrapResult(res);
            setRegions(resRegion.payload['$values']);
            unwrapResult(resRegion);
        } catch (e) {
            console.log(e);
        }
    };

    const initialValues={
        Name: productEdit?productEdit.name:'',
        Description: productEdit?productEdit.description:'',
        Price: productEdit?productEdit.price:0.0,
        PriceSale:productEdit?productEdit.priceSale:0.0,
        CategoryId:productEdit?productEdit.categoryId:'',
        RegionId:productEdit?productEdit.regionId:'',
        ProvinceId:productEdit?productEdit.provinceId:'',
        Dvt:productEdit?productEdit.dvt:'',
        Amount:productEdit?productEdit.amount:'',
        Weight:productEdit?productEdit.weight:'',
        CheckHotProduct:productEdit&&productEdit.checkHotProduct.toString(),
    };

    const ProductSchema = Yup.object().shape({
        Name: Yup.string().required(),
        Price: Yup.number().required(),
        PriceSale: Yup.number(),
        CategoryId: Yup.number().required(),
        RegionId: Yup.number().required(),
        ProvinceId: Yup.number().required(),
        Dvt: Yup.string().required(),
        Amount: Yup.number().required(),
        Weight: Yup.string().required(),

    });

    const formik = useFormik({
        initialValues,
        validationSchema: ProductSchema,

        onSubmit: async (values,{resetForm}) => {
            try {
                const res = await productEdit ?
                    dispatch(editProduct({
                        id:productEdit.id,
                        Name: values.Name,
                        Description: bodyDes,
                        Price: values.Price,
                        PriceSale: values.PriceSale,
                        CategoryId: values.CategoryId,
                        RegionId: values.RegionId,
                        ProvinceId: values.ProvinceId,
                        Amount: values.Amount,
                        Dvt:values.Dvt,
                        CheckHotProduct:values.CheckHotProduct,
                        Weight: `${values.Weight}${typeOfWeight}`
                    }))

                    :dispatch(postProduct({
                        Name: values.Name,
                        Description: bodyDes,
                        Price: values.Price,
                        PriceSale: values.PriceSale,
                        CategoryId: values.CategoryId,
                        RegionId: values.RegionId,
                        ProvinceId: values.ProvinceId,
                        Amount: values.Amount,
                        Dvt:values.Dvt,
                        CheckHotProduct:values.CheckHotProduct,
                        Weight: `${values.Weight}${typeOfWeight}`
                    }))
                ;
                unwrapResult(res);
                props.handleFormSubmit(productEdit);
                resetForm();
            } catch (e) {
                console.log(e);
            }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const renderCategory = (values,getFieldProps) => {
        return (
            <Stack spacing={4} style={{width:200}}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.CategoryId}
                    {...getFieldProps('CategoryId')}

                >
                    {categories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}

                </Select>
            </Stack>
        );
    };

    const renderRegion = (values,getFieldProps) => {
        return (
            <Stack spacing={3} style={{width:'35%'}}>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.RegionId}
                    {...getFieldProps('RegionId')}
                >
                    {regions.map((item) => (
                        <MenuItem onClick={ async ()=>{
                            try {
                                const province =await dispatch(getProvinces(item.id));
                                unwrapResult(province);
                                setProvinces(province.payload.province['$values']);
                            }catch (e){
                                console.log(e);
                            }

                        }} key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}

                </Select>
            </Stack>
        );
    };

    const renderProvince = (values,getFieldProps) => {
        return (
            <Stack spacing={3} style={{width:'60%'}}>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.ProvinceId}
                    {...getFieldProps('ProvinceId')}
                >
                    {provinces.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </Stack>
        );
    };

    const renderDvt = (values,getFieldProps) => {
        return (
            <Stack spacing={4} style={{width:200}}>
                <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.Dvt}
                    {...getFieldProps('Dvt')}
                >
                    {dvts.map((item) => (
                        <MenuItem key={item.id} value={item.name} >{item.name}</MenuItem>
                    ))}
                </Select>
            </Stack>
        );
    };

    const renderHotProduct = (values,getFieldProps) => {
        return (
            <Stack spacing={4} style={{width:200}}>
                <InputLabel id="demo-simple-select-label">Sp Hot</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={values.CheckHotProduct}
                    {...getFieldProps('CheckHotProduct')}
                >
                    {checkHotProduct.map((item, index) => (
                        <MenuItem key={index} value={item} >{item.toString()}</MenuItem>
                    ))}
                </Select>
            </Stack>
        );
    };

    const renderWeight = (values,getFieldProps) => {
        return (
            <Stack spacing={4} style={{width:300}}>
                <InputLabel id="demo-simple-select-label">Khối lượng</InputLabel>
                <div style={{
                    display:'flex',
                }}>
                    <TextField
                        fullWidth
                        autoComplete='Weight'
                        type='text'
                        label='Weight'
                        value={values.Weight}
                        {...getFieldProps('Weight')}
                        error={Boolean(touched.Weight && errors.Weight)}
                        helperText={touched.Weight && errors.Weight}
                    />
                    <select id="demo-simple-select"
                        value={typeOfWeight}
                        style={{
                            height:56,
                            borderRadius:8,
                            border:'0.5px solid #dce0e4',
                            lineHeight: '1.4375em',
                            fontSize: '1rem',
                            fontFamily: 'Public Sans,sans-serif',
                            fontWeight: 400,
                            padding:14,
                            width:110
                        }}
                        onChange={(e)=>setTypeOfWeight(e.target.value)}
                    >
                        {weights.map(item=>(
                            <option key={item.id} value={item.name} >{item.name}</option>
                        ))}
                    </select>
                </div>
            </Stack>
        );
    };

    CreateForm.modules = {
        toolbar:[
            [{header:'1'},{header:'2'},{header:[3,4,5,6]},{font:[]}],
            [{size:[]}],
            ['bold','italic','underline','strike','blockquote'],
            [{list:'ordered'},{list:'bullet'}],
            ['link','image','video'],
            ['clean'],
            ['code-block'],
        ],
    };
    CreateForm.formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'video',
        'code-block'
    ];

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
                    <ReactQuill
                        placeholder={'some thing like ....'}
                        value={bodyDes}
                        onChange={(e)=>setBodyDes(e)}
                        modules={CreateForm.modules}
                        formats={CreateForm.formats}
                    />
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}>
                        <TextField
                            fullWidth
                            autoComplete='Price'
                            type='number'
                            label='Price'
                            value={values.Price}
                            style={{maxWidth:300}}
                            {...getFieldProps('Price')}
                            error={Boolean(touched.Price && errors.Price)}
                            helperText={touched.Price && errors.Price}
                        />
                        <TextField
                            fullWidth
                            autoComplete='PriceSale'
                            type='number'
                            label='PriceSale'
                            style={{maxWidth:300}}
                            value={values.PriceSale}
                            {...getFieldProps('PriceSale')}
                            error={Boolean(touched.PriceSale && errors.PriceSale)}
                            helperText={touched.PriceSale && errors.PriceSale}
                        />
                        <TextField
                            fullWidth
                            autoComplete='Amount'
                            type='number'
                            label='Amount'
                            style={{maxWidth:300}}
                            value={values.Amount}
                            {...getFieldProps('Amount')}
                            error={Boolean(touched.Amount && errors.Amount)}
                            helperText={touched.Amount && errors.Amount}
                        />
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        {renderCategory(values,getFieldProps)}
                        {renderDvt(values,getFieldProps)}
                        {renderWeight(values,getFieldProps)}
                        {renderHotProduct(values,getFieldProps)}
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        {renderRegion(values,getFieldProps)}
                        {renderProvince(values,getFieldProps)}
                    </div>

                </Stack>

                <LoadingButton
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    loading={isSubmitting}
                    style={{
                        marginTop:30
                    }}
                >
                    Submit
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
