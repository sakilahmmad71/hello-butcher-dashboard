import Axios from 'axios'

import { BASE_URL } from '../../urls/baseurl'
import * as actions from '../types/ordersTypes'

const startFetchingOrders = () => ({ type: actions.FETCH_ORDERS_REQUEST })

const successFetchingOrders = (orderData) => ({ type: actions.SUCCESS_ORDERS_REQUEST, payload: orderData })

const failedFetchingOrders = (errorData) => ({ type: actions.FAILED_ORDERS_REQUEST, payload: errorData })

export const getOrdersFromApi = () => async (dispatch) => {
    dispatch(startFetchingOrders())

    try {
        const response = await Axios.get(`${BASE_URL}/orders/all-orders`)

        if (response.data.code === 200) {
            dispatch(successFetchingOrders(response.data.orders))
        }
    } catch (err) {
        dispatch(failedFetchingOrders(err.message))
        console.log(err)
    }
}

// Axios.get(`${BASE_URL}/orders/all-orders${query}`)
//     .then((response) => response.data.code === 200 && dispatch(successFetchingOrders(response.data.orders)))
//     .catch((err) => {
//         console.log(err)
//         dispatch(failedFetchingOrders(err.message))
//     })

const startFetchingLimitedOrders = () => ({ type: actions.FETCH_LIMITED_ORDERS_REQUEST })

const successFetchingLimitedOrders = (orderData) => ({ type: actions.SUCCESS_LIMITED_ORDERS_REQUEST, payload: orderData })

const failedFetchingLimitedOrders = (errorData) => ({ type: actions.FAILED_LIMITED_ORDERS_REQUEST, payload: errorData })

export const getLimitedOrdersFromApi = () => async (dispatch) => {
    dispatch(startFetchingLimitedOrders())

    try {
        const response = await Axios.get(`${BASE_URL}/orders/all-orders/limit`)

        if (response.data.code === 200) {
            dispatch(successFetchingLimitedOrders(response.data.orders))
        }
    } catch (err) {
        dispatch(failedFetchingLimitedOrders(err.message))
        console.log(err)
    }
}