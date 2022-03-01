import axios from 'axios';

const url = 'https://localhost:44349/api/';
export const productApi = {
    getData: async () => {
        return await axios.get(url+'Products');
    },
    postData: async (data,config) => {
        return await axios.post(url+'Products',data,config);
    },
    getProductById: async (id)=>{
        return await  axios.get(url+`Products/${id}`);
    },
    deleteProduct:async (id,config)=>{
        return  await axios.delete(url+`Products/${id}`,config);
    },
    editProduct: async (data,config)=>{
        return await axios.put(url+`Products/${data.id}`,data,config);
    },
    postImage: async (data,config)=>{
        return await axios.post(url+'ProductImage',data,config);
    }

};