import Axios from 'axios'

import * as actions from '../types/postcodeTypes'
import { BASE_URL } from '../../urls/baseurl'
import { clearErrors } from './errorAction'

const startFetchingPostcodes = () => ({ type: actions.FETCH_POSTCODE_REQUEST })

const successFetchingPostcodes = (postcodeData) => ({ type: actions.FETCH_POSTCODE_SUCCESS, payload: postcodeData })

const failedFetchingPostcodes = (errorData) => ({ type: actions.FETCH_POSTCODE_FAILED, payload: errorData })

export const getPostcodesFromApi = () => async (dispatch) => {
    dispatch(startFetchingPostcodes())
    dispatch(clearErrors())

    try {
        const response = await Axios.get(`${BASE_URL}/postcodes/postcode`)

        if (response.data.code === 200) {
            dispatch(successFetchingPostcodes(response.data.postcodes))
        }
    } catch (err) {
        dispatch(failedFetchingPostcodes(err.message))
        console.log(err)
    }
}

// Axios.get(`${BASE_URL}/postcodes/postcode`)
//     .then((response) => response.data.code === 200 && dispatch(successFetchingPostcodes(response.data.postcodes)))
//     .catch((err) => {
//         console.log(err)
//         dispatch(failedFetchingPostcodes(err.message))
//     })

const startAddingPostcodes = () => ({ type: actions.ADD_POSTCODE_REQUEST })

const successAddingPostcodes = (postcodeData) => ({ type: actions.ADD_POSTCODE_SUCCESS, payload: postcodeData })

const failedAddingPostcodes = (errorData) => ({ type: actions.ADD_POSTCODE_FAILED, payload: errorData })

export const addPostcodesToApi = (postcodeData) => async (dispatch) => {
    dispatch(startAddingPostcodes())
    dispatch(clearErrors())

    try {
        const response = await Axios.post(`${BASE_URL}/postcodes/add-postcode`, postcodeData)

        if (response.data.code === 200) {
            dispatch(successAddingPostcodes(postcodeData))
        }
    } catch (err) {
        dispatch(failedAddingPostcodes(err.message))
        console.log(err)
    }
}

// Axios.post(`${BASE_URL}/postcodes/add-postcode`, postcodeData)
//     .then((response) => response.data.code === 200 && dispatch(successAddingPostcodes(postcodeData)))
//     .catch((err) => {
//         console.log(err);
//         // dispatch(getErrors(err.response.data.errors))
//         dispatch(failedAddingPostcodes(err.message))
//     });