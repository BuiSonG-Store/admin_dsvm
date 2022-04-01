import axios from 'axios';
const url =process.env.REACT_APP_HOST + '/api/Provinces/';
export const provinceApi = {
    getProvinces: async (params) => {
        return await axios.get(url+params);
    }
};
