import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { BASE_URL } from '../../urls/baseurl'
import { SET_CURRENT_USER } from '../types/authActionTypes'
import setAuthToken from '../../utils/setAuthToken'
import { clearErrors, getErrors } from './errorAction'

// setting current user based on saved data
export const setCurrentUser = (decoded) => ({ type: SET_CURRENT_USER, payload: decoded })

// decoding token from localstorage
const decodeTokenFromLocalStorage = (response) => {
    const { token } = response.data
    localStorage.setItem('jwtToken', token)
    const decodedToken = jwt_decode(token)

    return decodedToken
}

// login users to the dashboard
export const loginUser = (userData) => async (dispatch) => {
    dispatch(clearErrors())
    try {
        const response = await axios.post(`${BASE_URL}/admins/login`, userData)
        if (response.data.code === 200) {
            const decoded = decodeTokenFromLocalStorage(response)
            dispatch(setCurrentUser(decoded))
        }
    } catch (err) {
        dispatch(getErrors(err.response.data.errors))
        console.log(err)
    }
}

// axios
//     .post(`${BASE_URL}/admins/login`, userData)
//     .then((response) => {
//         if (response.data.code === 200) {
//             const decoded = decodeTokenFromLocalStorage(response)
//             dispatch(setCurrentUser(decoded))
//         }
//     })
//     .catch((err) => dispatch(getErrors(err.response.data.errors)))

// logout users from dashboard
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}
