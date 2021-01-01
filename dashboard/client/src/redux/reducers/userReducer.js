import * as actions from '../types/userActionTypes';

const initialState = {
    users: [],
    loading: false,
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            };

        case actions.FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }

        default:
            return state;
    }
};

export default userReducer;
