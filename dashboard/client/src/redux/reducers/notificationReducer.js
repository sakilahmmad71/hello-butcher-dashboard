import * as actions from '../types/notificationTypes'

const initialState = {
    notifications: [],
    loading: false,
    error : ''
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.payload,
                loading: false
            }

        case actions.FETCH_NOTIFICATIONS_FAILED:
            return {
                notifications : [],
                loading : false,
                error : action.payload
            }

        case actions.ADD_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading : true
            }

        case actions.ADD_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications : [action.payload, ...state.notifications],
                loading : false
            }

        case actions.ADD_NOTIFICATIONS_FAILED:
            return {
                notifications : [],
                loading: false,
                error : action.payload
            }

        default:
            return state
    }
}

export default notificationReducer