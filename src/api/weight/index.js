import axios from 'axios';

const url = 'https://localhost:44349/api/Weights';
export const weightApi = {
    getWeight: async () => {
        return await axios.get(url);
    }

};
