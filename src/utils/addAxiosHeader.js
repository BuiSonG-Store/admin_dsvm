import {getSessionStorage} from './sessionStorage';

const addAxiosHearder=()=>{
    const token = getSessionStorage().token;
    const basicAuth='Bearer '+token;
    return{
        Authorization:basicAuth
    };
};
export default addAxiosHearder;
