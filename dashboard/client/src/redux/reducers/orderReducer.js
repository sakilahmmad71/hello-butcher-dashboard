import * as actions from '../types/orderTypes'

const initialState = {
    order: [],
    loading: false,
    error: ''
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetching Single order by ID 
        case actions.FETCH_ORDER_REQUEST_BY_ID:
            return {
                ...state,
                loading: true
            }

        case actions.SUCCESS_ORDER_REQUEST_BY_ID:
            return {
                ...state,
                order: action.payload,
                loading: false
            }

        case actions.FAILED_ORDER_REQUEST_BY_ID:
            return {
                order: null,
                loading: false,
                error: action.payload
            }

        // Update Order
        case actions.REQUEST_ORDER_UPDATE:
            return {
                ...state,
                loading: true
            }

        case actions.SUCCESS_ORDER_UPDATE:
            return {
                ...state,
                loading: false
            }

        case actions.FAILED_ORDER_UPDATE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export default orderReducer