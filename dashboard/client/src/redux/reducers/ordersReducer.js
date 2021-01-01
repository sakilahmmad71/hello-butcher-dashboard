import * as actions from '../types/ordersTypes'

const initialState = {
    orders: [],
    loading: false,
    error: '',
    limitedOrders: []
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetching orders
        case actions.FETCH_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.SUCCESS_ORDERS_REQUEST:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }

        case actions.FAILED_ORDERS_REQUEST:
            return {
                orders: [],
                loading: false,
                error: action.payload
            }

        case actions.FETCH_LIMITED_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.SUCCESS_LIMITED_ORDERS_REQUEST:
            return {
                ...state,
                limitedOrders: action.payload,
                loading: false
            }

        case actions.FAILED_LIMITED_ORDERS_REQUEST:
            return {
                ...state,
                limitedOrders: [],
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export default ordersReducer