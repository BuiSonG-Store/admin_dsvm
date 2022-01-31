import axios from 'axios';

const url = 'https://localhost:44349/api/Products';
export const productApi = {
    getData: async () => {
        return await axios.get(url);
    },
    postData: async (data) => {
        return await axios.post(url,data);
    }
};