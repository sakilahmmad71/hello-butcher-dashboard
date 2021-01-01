import {SET_CURRENT_USER} from '../types/authActionTypes';
import isEmpty from '../../validations/is_empty';

// Creating our initial State for store
const initialState = {
    isAuthenticated: false,
    user: {},
};

// authReducer is taking action and depending on that acton change our state
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
