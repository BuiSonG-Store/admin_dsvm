import axios from 'axios';

const url = process.env.REACT_APP_HOST + '/api/Accounts/login';
export const loginApi = {
    login: async (data) => {
        return await axios.post(url,data);
    },
};