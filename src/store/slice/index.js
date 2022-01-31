import products from './products';
import { combineReducers } from 'redux';
import login from './loginAndLogout';
const rootReducer=combineReducers({
    products:products,
    login:login
});
export default rootReducer;