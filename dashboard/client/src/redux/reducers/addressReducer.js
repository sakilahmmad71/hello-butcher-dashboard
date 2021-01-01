import * as actions from '../types/addressTypes'

const initialState = {
    addresses: [],
    loading: false,
    error : ''
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.SUCCESS_ADDRESSES_REQUEST:
            return {
                ...state,
                addresses: action.payload,
                loading: false
            }

        case actions.FAILED_ADDRESSES_REQUEST:
            return {
                addresses : [],
                loading : false,
                error : action.payload
            }

        default:
            return state
    }
}

export default addressReducer