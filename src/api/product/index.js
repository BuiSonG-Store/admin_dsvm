import axios from 'axios';

const url = process.env.REACT_APP_HOST;
export const productApi = {
    getData: async () => {
        return await axios.get(url+'/api/Products');
    },
    postData: async (data,config) => {
        return await axios.post(url+'/api/Products',data,config);
    },
    getProductById: async (id)=>{
        return await  axios.get(url+`/api/Products/${id}`);
    },
    deleteProduct:async (id,config)=>{
        return  await axios.delete(url+`/api/Products/${id}`,config);
    },
    editProduct: async (data,config)=>{
        return await axios.put(url+`/api/Products/${data.id}`,data,config);
    },
    postImage: async (data,config)=>{
        return await axios.post(url+'/api/ProductImage',data,config);
    },
    editProductImage: async (data,config)=>{
        return await axios.put(url+`/api/ProductImage/${data.get('ProductId')}`,data,config);
    }
};
