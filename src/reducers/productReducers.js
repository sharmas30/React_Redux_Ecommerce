import * as myReducer from "../constants/productConstants";

export const productListReducer = (state = {products: []}, action) =>{
    switch (action.type) {
        case myReducer.PRODUCT_LIST_REQUEST:
            return {loading: true};
            break;
        case myReducer.PRODUCT_LIST_SUCCESS:
            return {products: action.payload, loading: action.isLoading};
            break;
        case myReducer.PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
    
        default:
            return state;
            break;
    }
}
