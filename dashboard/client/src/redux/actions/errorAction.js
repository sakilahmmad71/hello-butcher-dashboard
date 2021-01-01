import { CLEAR_ERRORS, GET_ERRORS } from "../types/errorActionTypes"

// catching errors
export const getErrors = (errorData) => ({ type : GET_ERRORS, payload : errorData})

// clear occured errors
export const clearErrors = () => ({ type : CLEAR_ERRORS })