import Axios from 'axios'

import { BASE_URL } from '../../urls/baseurl'
import * as actions from '../types/orderTypes'

// Get Order by id for update
const startFetchingOrderById = () => ({ type: actions.FETCH_ORDER_REQUEST_BY_ID })

const successFetchingOrderById = (orderData) => ({ type: actions.SUCCESS_ORDER_REQUEST_BY_ID, payload: orderData })

const failedFetchingOrderById = (errorData) => ({ type: actions.FAILED_ORDER_REQUEST_BY_ID, payload: errorData })

export const getOrderByIdFromApi = (id) => async (dispatch) => {
    dispatch(startFetchingOrderById())

    try {
        const response = await Axios.get(`${BASE_URL}/orders/${id}`)

        if (response.data.code === 200) {
            dispatch(successFetchingOrderById(response.data.order))
        }
    } catch (err) {
        dispatch(failedFetchingOrderById(err.message))
        console.log(err)
    }
}
// Axios.get(`${BASE_URL}/orders/${id}`)
//     .then((response) => response.data.code === 200 && dispatch(successFetchingOrderById(response.data.order)))
//     .catch((err) => {
//         console.log(err)
//         dispatch(failedFetchingOrderById(err.message))
//     })

// Getting Order and Update the order
const startUpdatingOrder = () => ({ type: actions.REQUEST_ORDER_UPDATE })

const successUpdatingOrder = () => ({ type: actions.SUCCESS_ORDER_UPDATE })

const failedUpdatingOrder = (errorData) => ({ type: actions.FAILED_ORDER_UPDATE, payload: errorData })

export const updateOrderToApi = (id, orderStatus) => async (dispatch) => {
    dispatch(startUpdatingOrder())

    try {
        const response = await Axios.patch(`${BASE_URL}/orders/update-order/${id}`, orderStatus)

        if (response.data.code === 200) {
            dispatch(successUpdatingOrder())
        }
    } catch (err) {
        dispatch(failedUpdatingOrder(err.message))
        console.log(err)
    }
}

// Axios.patch(`${BASE_URL}/orders/update-order/${id}`, orderStatus)
//     .then((response) => response.data.code === 200 && dispatch(successUpdatingOrder()))
//     .catch((err) => {
//         console.log(err)
//         dispatch(failedUpdatingOrder(err.message))
//     })