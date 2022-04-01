import axios from 'axios';

const url =process.env.REACT_APP_HOST + '/api/Weights';
export const weightApi = {
    getWeight: async () => {
        return await axios.get(url);
    }

};
