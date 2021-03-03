import {usersAPI} from "../Api/Api";
import {Dispatch} from "react";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    username: null,
    email: null,
    password: null,
};

type ActionType = {
    type: typeof SET_USER_DATA,
    data?: {}
}

export const authReducer = (state = initialState, action: ActionType) => {

    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }

        default:
            return state;
    }
}

export const setAuthUserData = (email: string, login: string, password: string) => {
    return {
        type: SET_USER_DATA,
        data: {
            login,
            email,
            password,
        }
    }
}

// export const getAuthUserData = () => {
//     return (dispatch) => {
//
//         usersAPI.getLogin()
//             .then(response => {
//                 if (response.resultCode === 0) {
//                     let {id, email, login} = response.data
//                     dispatch(setAuthUserData(id, email, login, true));
//                 }
//             })
//     }
// }

// export const login = (username: string, password: string, email: string) => (dispatch: Dispatch<any>) => {
//     debugger
//     usersAPI.login(username, password, email)
//         .then(response => {
//             if (response.statusText === 'OK') {
//                 dispatch(setAuthUserData(username, password, email))
//                 console.log(response)
//             }
//         });
// }

export const login = (username: string, password: string, email: string) => {

    usersAPI.login(username, password, email)
        .then(response => {
            if (response.statusText === 'OK') {
                setAuthUserData(username, password, email)
                console.log(response)
            }
        });
}