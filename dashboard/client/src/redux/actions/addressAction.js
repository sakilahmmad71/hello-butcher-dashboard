import Axios from 'axios'

import { BASE_URL } from '../../urls/baseurl'
import * as actions from '../types/addressTypes'

const startFetchingAddresses = () => ({ type: actions.FETCH_ADDRESSES_REQUEST })

const successFetchingAddresses = (addressData) => ({ type: actions.SUCCESS_ADDRESSES_REQUEST, payload: addressData })

const failedFetchingAddresses = (errorData) => ({ type: actions.FAILED_ADDRESSES_REQUEST, payload: errorData })

export const getAddressesFromApi = () => async (dispatch) => {
    dispatch(startFetchingAddresses())
    try {
        const response = await Axios.get(`${BASE_URL}/addresses`)
        if (response.data.code === 200) {
            dispatch(successFetchingAddresses(response.data.addresses))
        }
    } catch (err) {
        dispatch(failedFetchingAddresses(err.message))
        console.log(err)
    }
}

// Axios.get(`${BASE_URL}/addresses`)
//     .then((response) => response.data.code === 200 && dispatch(successFetchingAddresses(response.data.addresses)))
//     .catch((err) => {
//         console.log(err)
//         dispatch(failedFetchingAddresses(err.message))
//     })