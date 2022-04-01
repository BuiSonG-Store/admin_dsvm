import axios from 'axios';

const url =process.env.REACT_APP_HOST + '/api/';
export const userApi = {
    getUser: async (config) => {
        return await axios.get(url + 'Accounts',config);
    },
    postUser: async (data) => {
        return await axios.post(url + 'Accounts', data);
    },
    deleteUser: async (id,config) => {
        return await axios.delete(url + `Accounts/${id}`,config);
    },
    editUser: async (data,config) => {
        return await axios.put(url + `Accounts/${data.id}`, data,config);
    },
    getUserById: async (id)=>{
        return await  axios.get(url+`Accounts/id?id=${id}`);
    },

};
