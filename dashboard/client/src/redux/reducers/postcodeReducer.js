import * as actions from '../types/postcodeTypes'

const initialState = {
    postcodes : [],
    loading : false,
    error : ''
}

const postcodeReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_POSTCODE_REQUEST :
            return {
                ...state,
                loading : true
            }

        case actions.FETCH_POSTCODE_SUCCESS :
            return {
                ...state,
                postcodes : action.payload,
                loading : false
            }

        case actions.FETCH_POSTCODE_FAILED :
            return {
                postcodes : [],
                loading : false,
                error : action.payload
            }

        case actions.ADD_POSTCODE_REQUEST :
            return {
                ...state,
                loading : true
            }
    
        case actions.ADD_POSTCODE_SUCCESS :
            return {
                ...state,
                postcodes : [action.payload, ...state.postcodes],
                loading : false
            }
    
        case actions.ADD_POSTCODE_FAILED :
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        default :
            return state
    }
}

export default postcodeReducer