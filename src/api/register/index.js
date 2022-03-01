import axios from 'axios';

const url = 'https://localhost:44349/api/Accounts/register';
export const registerApi = {
    register: async (data) => {
        return await axios.post(url,data);
    },
};