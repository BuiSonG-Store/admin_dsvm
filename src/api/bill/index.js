import axios from 'axios';

const url = 'https://localhost:44349/api/';
export const billApi = {
    getData: async () => {
        return await axios.get(url+'Bills');
    },
    getBillById: async (id)=>{
        return await  axios.get(url+`Bills/${id}`);
    },
    editBill: async (data,config)=>{
        return await axios.put(url+`Bills/${data.id}`,data,config);
    },
};