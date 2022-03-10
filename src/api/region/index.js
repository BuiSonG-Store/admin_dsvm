import axios from 'axios';

const url='https://localhost:44349/api/Regions/';
export const regionApi = {
    getData: async () => {
        return await axios.get(url);
    },
    getRegionById: async (id,config)=>{
        return await  axios.get(url+id,config);
    },
    createRegion: async (data,config) => {
        return await axios.post(url, data,config);
    },
    deleteRegion: async (id,config) => {
        return await axios.delete(url +id,config);
    },
};
