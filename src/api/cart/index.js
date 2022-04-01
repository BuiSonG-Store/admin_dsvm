import axios from 'axios';

export const product = {
    getData: async (params) => {
        return await axios.get(process.env.REACT_APP_HOST +`/device_by_hour?startDate=${params.startDate}&endDate=${params.endDate}`);
    }
};