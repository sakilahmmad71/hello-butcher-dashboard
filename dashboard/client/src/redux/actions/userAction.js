import Axios from 'axios'

import setAuthToken from '../../utils/setAuthToken'
import { BASE_URL } from '../../urls/baseurl'
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILED } from '../types/userActionTypes'

// Start fetching users data
const startFetchingUsers = () => ({ type: FETCH_USERS_REQUEST })

// users data fetched successful
const successFetchingUsers = (userData) => ({ type: FETCH_USERS_SUCCESS, payload: userData })

// Having errors while fetched users data
const failedFethingUsers = (errorData) => ({ type: FETCH_USERS_FAILED, payload: errorData })

// making request to API and get all availble users data
export const getAllUsersFromApi = () => async (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken)
    }
    dispatch(startFetchingUsers())

    try {
        const response = await Axios.get(`${BASE_URL}/admins/users`)

        if (response.data.code === 200) {
            dispatch(successFetchingUsers(response.data.users))
        }
    } catch (err) {
        dispatch(failedFethingUsers(err.message))
        console.log(err)
    }
}

// Axios.get(`${BASE_URL}/admins/users`)
//     .then((response) => response.data.code === 200 && dispatch(successFetchingUsers(response.data.users)))
//     .catch((err) => dispatch(failedFethingUsers(err.message)))