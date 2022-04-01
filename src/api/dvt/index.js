import axios from 'axios';

const url = process.env.REACT_APP_HOST +'/api/Dvts';
export const dvtApi = {
    getDvt: async () => {
        return await axios.get(url);
    },
};
