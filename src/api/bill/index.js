import axios from 'axios';

const url = process.env.REACT_APP_HOST +'/api/';
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