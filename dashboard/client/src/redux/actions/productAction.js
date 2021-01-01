import Axios from 'axios';

import { BASE_URL } from '../../urls/baseurl';
import * as actions from '../types/productActionTypes';
import { getErrors, clearErrors } from './errorAction';

// Get products
const startFetchingProducts = () => ({ type: actions.FETCH_PRODUCTS_REQUEST })

const successFetchingProducts = (productData) => ({ type: actions.FETCH_PRODUCTS_SUCCESS, payload: productData })

const failedFetchingProducts = (errorData) => ({ type: actions.FETCH_PRODUCTS_FAILED, payload: errorData })

export const getAllProductsFromApi = () => async (dispatch) => {
   dispatch(startFetchingProducts())

   try {
      const response = await Axios.get(`${BASE_URL}/products/product`)

      if (response.data.code === 200) {
         dispatch(successFetchingProducts(response.data.products))
      }
   } catch (err) {
      console.log(err)
      dispatch(failedFetchingProducts(err.message))
   }
}

// Axios.get(`${BASE_URL}/products/product`)
//    .then((response) => response.data.code === 200 && dispatch(successFetchingProducts(response.data.products)))
//    .catch((err) => {
//       console.log(err)
//       dispatch(failedFetchingProducts(err.message))
//    })

// Add Product
const startAddingProduct = () => ({ type: actions.ADD_PRODUCT_REQUEST })

const successAddingProduct = (productData) => ({ type: actions.ADD_PRODUCT_SUCCESS, payload: productData })

const failedAddingProduct = (errorData) => ({ type: actions.ADD_PRODUCT_FAILED, payload: errorData })

export const addProductToApi = (productData) => async (dispatch) => {
   dispatch(clearErrors())
   dispatch(startAddingProduct())

   try {
      const response = await Axios.post(`${BASE_URL}/products/product`, productData)

      if (response.data.code === 200) {
         dispatch(successAddingProduct(productData))
      }
   } catch (err) {
      dispatch(failedAddingProduct(err.message))
      console.log(err)
   }
}

// Axios.post(`${BASE_URL}/products/product`, productData)
//    .then((response) => response.data.code === 200 && dispatch(successAddingProduct(productData)))
//    .catch((err) => {
//       console.log(err)
//       // dispatch(getErrors(err.response))
//       dispatch(failedAddingProduct(err.message))
//    })

// Update product
const startUpdatingProduct = () => ({ type: actions.UPDATE_PRODUCT_REQUEST })

const successUpdatingProduct = () => ({ type: actions.UPDATE_PRODUCT_SUCCESS })

const failedUpdatingProduct = (errorData) => ({ type: actions.UPDATE_PRODUCT_FAILED, payload: errorData })

export const updateProductToApi = (id, productData, history) => async (dispatch) => {
   dispatch(startUpdatingProduct())

   try {
      const response = await Axios.patch(`${BASE_URL}/products/product/${id}`, productData)

      if (response.data.code === 200) {
         dispatch(successUpdatingProduct())
         history.push('/products')
      }
   } catch (err) {
      dispatch(failedUpdatingProduct(err.message))
      console.log(err)
   }
}

// Axios.patch(`${BASE_URL}/products/product/${id}`, productData)
//    .then((response) => {
//       if (response.data.code === 200) {
//          dispatch(successUpdatingProduct())
//          history.push('/products')
//       }
//    })
//    .catch((err) => {
//       console.log(err)
//       // dispatch(getErrors(err.response))
//       dispatch(failedUpdatingProduct(err.message))
//    })

// Delete product
const startDeletingProduct = () => ({ type: actions.DELETE_PRODUCT_REQUEST })

const successDeletingProduct = (productId) => ({ type: actions.DELETE_PRODUCT_SUCCESS, payload: productId })

const failedDeletingProduct = (errorData) => ({ type: actions.DELETE_PRODUCT_FAILED, payload: errorData })

export const deleteProductToApi = (id) => async (dispatch) => {
   dispatch(startDeletingProduct())

   try {
      const response = await Axios.delete(`${BASE_URL}/products/product/${id}`)

      if (response.data.code === 200) {
         dispatch(successDeletingProduct(id))
      }
   } catch (err) {
      dispatch(failedDeletingProduct(err.message))
      console.log(err)
   }
}

// Axios.delete(`${BASE_URL}/products/product/${id}`)
//    .then((response) => response.data.code === 200 && dispatch(successDeletingProduct(id)))
//    .catch((err) => {
//       console.log(err)
//       // dispatch(getErrors(err.response))
//       dispatch(failedDeletingProduct(err.message))
//    });