import * as actions from '../types/productActionTypes';

const initialState = {
    loading: false,
    products: [],
    error : ''
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetching products from API
        case actions.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products : action.payload,
                loading : false
            }

        case actions.FETCH_PRODUCTS_FAILED:
            return {
                products : [],
                loading : false,
                error : action.payload
            }

        // Add product to API
        case actions.ADD_PRODUCT_REQUEST:
            return {
                ...state,
                loading : true
            }

        case actions.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products : [action.payload, ...state.products],
                loading : false
            }

        case actions.ADD_PRODUCT_FAILED:
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        // Update product to API
        case actions.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading : true
            }

        case actions.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading : false
            }

        case actions.UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        // delete product request
        case actions.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products : state.products.filter(product => product._id !== action.payload),
                loading : false
            }

        case actions.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        default:
            return state;
    }
};

export default productReducer;
