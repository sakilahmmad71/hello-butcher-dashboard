import * as actions from '../types/deviceActionTypes'

const initialState = {
    devices : [],
    loading : false,
    error : ''
}

const deviceReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_DEVICE_REQUEST :
            return {
                ...state,
                loading : true
            }

        case actions.FETCH_DEVICE_SUCCESS :
            return {
                ...state,
                devices : action.payload,
                loading : false
            }

        case actions.FETCH_DEVICE_FAILED :
            return {
                devices : [],
                loading : false,
                error : action.payload
            }

        default :
            return state
    }
}

export default deviceReducer