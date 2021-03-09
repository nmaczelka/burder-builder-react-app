import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
}

const purchaseBurderStart = (state, action) => {
    return updateObject(state, {laoding: true});
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderDate, {id: action.orderId});
    return updateObject(state, {
        laoding: false,
        purchased: true,
        orders: state.orders.concat(newOrder)});
}

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {laoding: false});
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, {laoding: true});
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {laoding: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurderStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return purchaseBurgerFailed(state, action);
        case actionTypes.FETCH_ORDES_START: return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDES_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDES_FAIL: return fetchOrderFail(state, action);
        default: return state;
    }
}

export default reducer;