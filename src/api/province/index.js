import axios from 'axios';
const url = 'https://provinces.open-api.vn/api/?depth=3';
export const provinceApi = {
    getProvinces: async () => {
        return await axios.get(url);
    }
};
