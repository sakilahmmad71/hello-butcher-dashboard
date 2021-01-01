import Axios from "axios"

import { BASE_URL } from "../../urls/baseurl"
import setAuthToken from "../../utils/setAuthToken";
import { getErrors, clearErrors } from "./errorAction";
import * as actions from '../types/notificationTypes'

// Get Notifications
const startFetchingNotifications = () => ({ type: actions.FETCH_NOTIFICATIONS_REQUEST })

const successFetchingNotifications = (notificationsData) => ({ type: actions.FETCH_NOTIFICATIONS_SUCCESS, payload: notificationsData })

const failedFetchingNotifications = (errorData) => ({ type: actions.FETCH_NOTIFICATIONS_FAILED, payload: errorData })

export const getNotificationsFromApi = () => async (dispatch) => {
    dispatch(startFetchingNotifications())
    dispatch(clearErrors())

    try {
        const response = await Axios.get(`${BASE_URL}/notifications/all-notifications`)
        if (response.data.code === 200) {
            dispatch(successFetchingNotifications(response.data.notifications))
        }
    } catch (err) {
        dispatch(failedFetchingNotifications(err.message))
        console.log(err)
    }
}

// Axios.get(`${BASE_URL}/notifications/all-notifications`)
//     .then((response) => dispatch(successFetchingNotifications(response.data.notifications)))
//     .catch((err) => {
//         console.log(err)
//         // dispatch(getErrors(err.response.data.errors))
//         dispatch(failedFetchingNotifications(err.message))
//     })

// Add Notifications
const startAddingNotifications = () => ({ type: actions.ADD_NOTIFICATIONS_REQUEST })

const successAddingNotifications = (notificationData) => ({ type: actions.ADD_NOTIFICATIONS_SUCCESS, payload: notificationData })

const failedAddingNotifications = (errorData) => ({ type: actions.ADD_NOTIFICATIONS_FAILED, payload: errorData })

export const addNotificationsToApi = (notificationData) => async (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken)
    }

    dispatch(startAddingNotifications())
    dispatch(clearErrors())

    try {
        const response = await Axios.post(`${BASE_URL}/notifications`, notificationData)

        if (response.data.code === 200) {
            dispatch(successAddingNotifications(notificationData))
        }
    } catch (err) {
        dispatch(failedAddingNotifications(err.message))
        console.log(err)
    }
}

// Axios.post(`${BASE_URL}/notifications`, notificationData)
//     .then((response) => response.data.code === 200 && dispatch(successAddingNotifications(notificationData)))
//     .catch((err) => {
//         console.log(err);
//         // dispatch(getErrors(err.response.data.errors))
//         dispatch(failedAddingNotifications(err.message))
//     });