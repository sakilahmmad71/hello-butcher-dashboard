import {
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
} from '../types/profileActionTypes';
const initialState = {
    profile: null,
    profiles: null,
    loading: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            };

        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null,
            };

        default:
            return state;
    }
};

export default profileReducer;
