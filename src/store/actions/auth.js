import axios from 'axios';

import * as actionTpyes from './actionTypes';

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    };
}

export const authStart = () => {
    return {
        type: actionTpyes.AUTH_START
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTpyes.AUTH_LOGOUT
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTpyes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}


export const authFail = (error) => {
    return {
        type: actionTpyes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxQIaO-K8QK1r-jIjcNwbJKg3XRrXUo3U';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxQIaO-K8QK1r-jIjcNwbJKg3XRrXUo3U';
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.error)
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTpyes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        }else {
            const expirationDate =  new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 )); 
            }

        }
    }
}