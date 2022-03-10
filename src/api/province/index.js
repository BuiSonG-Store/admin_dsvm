import axios from 'axios';
const url = 'https://localhost:44349/api/Provinces/';
export const provinceApi = {
    getProvinces: async (params) => {
        return await axios.get(url+params);
    }
};
