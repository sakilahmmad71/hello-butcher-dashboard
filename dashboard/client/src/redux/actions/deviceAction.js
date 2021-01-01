import Axios from 'axios'

import { BASE_URL } from '../../urls/baseurl'
import * as actions from '../types/deviceActionTypes'

const startFetchingDevices = () => ({ type: actions.FETCH_DEVICE_REQUEST })

const successFetchingDevices = (deviceData) => ({ type: actions.FETCH_DEVICE_SUCCESS, payload: deviceData })

const failedFetchingDevices = (errorData) => ({ type: actions.FETCH_DEVICE_FAILED, payload: errorData })

export const getDevicesFromApi = () => async (dispatch) => {
    dispatch(startFetchingDevices())
    try {
        const response = await Axios.get(`${BASE_URL}/devices/devices`)
        if (response.data.code === 200) {
            dispatch(successFetchingDevices(response.data.devices))
        }
    } catch (err) {
        dispatch(failedFetchingDevices(err.message))
        console.log(err)
    }
}

// Axios.get(`${BASE_URL}/devices/devices`)
//     .then((response) => response.data.code === 200 && dispatch(successFetchingDevices(response.data.devices)))
//     .catch((err) => {
//         console.log(err)
//         dispatch(failedFetchingDevices(err.message))
//     })