import axios from 'axios';

const url =process.env.REACT_APP_HOST + '/api/Accounts/register';
export const registerApi = {
    register: async (data) => {
        return await axios.post(url,data);
    },
};