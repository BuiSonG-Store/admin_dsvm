import axios from 'axios';

const url = 'https://localhost:44349/api/';
export const categoryApi = {
    getCategory: async (config) => {
        return await axios.get(url + 'Categories',config);
    },
    createCategory: async (data,config) => {
        return await axios.post(url + 'Categories', data,config);
    },
    deleteCategory: async (id,config) => {
        return await axios.delete(url + `Categories/${id}`,config);
    },
    editCategory: async (data,config) => {
        return await axios.put(url + `Categories/${data.id}`, data,config);
    },
    getCategoryById: async (id,config)=>{
        return await  axios.get(url+`Categories/${id}`,config);
    },

};
