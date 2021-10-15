// import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, SELECETED_PRODUCT_FAIL, SELECETED_PRODUCT_REQUEST, SELECETED_PRODUCT_SUCCESS } from "../constants/productConstants"
import * as myAction from "../constants/productConstants"

import data from '../data'

export const listProducts = () => async (dispatch) =>{
    dispatch({
        type: myAction.PRODUCT_LIST_REQUEST
    })
    try {
        const {products} = data
        const allData = products
        
        console.log('action_1 ', allData)
        dispatch({type: myAction.PRODUCT_LIST_SUCCESS, payload: allData, isLoading: false})

    } catch (error) {
        dispatch({type: myAction.PRODUCT_LIST_FAIL, payload: error})   
    }    
}

