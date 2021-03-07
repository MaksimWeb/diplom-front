import {usersAPI} from "../../Api/Api";

const SET_USER_DATA = 'SET_USER_DATA';
const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';


let initialState = {
    id: null,
    username: null,
    password: null,
    loading: false,
    token: null,
    error: null
};


export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                id: action.id,
                username: action.username,
                password: action.password
            }
        }

        case AUTH_START: {
            return {
                error: null,
                loading: true
            }
        }

        case AUTH_SUCCESS: {
            return {
                token: action.token,
                error: null,
                loading: false
            }
        }

        case AUTH_FAIL: {
            return {
                error: action.error,
                loading: false
            }
        }

        case AUTH_LOGOUT: {
            return {
                token: null
            }
        }

        default:
            return state;
    }
}

export const setAuthUserData = (id, username, password) => {
    return {
        type: SET_USER_DATA,
        id,
        username,
        password,
    }
}

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const getAuthUser = (username, password) => (dispatch) => {
    usersAPI.getUsers()
        .then(response => {
            let userInfo = response.find(el => el.username === username)
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userInfo.id);
            dispatch(setAuthUserData(userInfo.id, userInfo.username, password))
        })

}

export const login = (username, password) => (dispatch) => {
    dispatch(authStart())
    usersAPI.login(username, password)
        .then(response => {
            if (response.statusText === 'OK') {
                const token = response.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token))
                dispatch(getAuthUser(username, password))
                dispatch(checkAuthTimeout(3600))
            }
        })
        .catch(err => {
            dispatch(authFail(err))
        })
}

export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

const authStart = () => {
    return {
        type: AUTH_START
    }
}

const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}

const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token')
    if (token === undefined) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}