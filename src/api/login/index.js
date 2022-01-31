import axios from 'axios';

const url = 'https://localhost:44349/api/Accounts/login';
export const loginApi = {
    login: async (data) => {
        return await axios.post(url,data);
    },
};