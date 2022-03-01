import axios from 'axios';

const url = 'https://localhost:44349/api/';
export const billApi = {
    getData: async () => {
        return await axios.get(url+'Bills');
    },
};