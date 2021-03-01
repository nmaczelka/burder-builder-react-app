import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredietns = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};


export const fetchIngredietnsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://react-my-burger-d7cf0-default-rtdb.firebaseio.com/ingredients.json' )
        .then( response => {
            dispatch(setIngredietns(response.data));
        })
        .catch( error => {
            dispatch(fetchIngredietnsFailed());
        });
    }
};