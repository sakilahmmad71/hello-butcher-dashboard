import { combineReducers } from 'redux';

import addressReducer from './addressReducer';
import authReducer from './authReducer';
import deviceReducer from './deviceReducer';
import errorReducer from './errorReducer';
import notificationReducer from './notificationReducer';
import orderReducer from './orderReducer';
import ordersReducer from './ordersReducer';
import postcodeReducer from './postcodeReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    products: productReducer,
    users: userReducer,
    notifications: notificationReducer,
    addresses: addressReducer,
    postcodes: postcodeReducer,
    devices: deviceReducer,
    orders: ordersReducer,
    order: orderReducer
});

export default rootReducer;
