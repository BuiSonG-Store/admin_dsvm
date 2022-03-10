import axios from 'axios';

const url = 'https://localhost:44349/api/Dvts';
export const dvtApi = {
    getDvt: async () => {
        return await axios.get(url);
    },
};
