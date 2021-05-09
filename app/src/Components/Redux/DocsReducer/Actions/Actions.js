import {SET_DOCS, SET_TEST_DOCS, SET_USERS} from "./ActionTypes/ActionTypes";
import {docsApi, usersApi} from "../Api/Api";

const setDocs = (docs) => {
    return {
        type: SET_DOCS,
        docs
    }
}

const setTestDocs = (testDocs) => {
    return {
        type: SET_TEST_DOCS,
        testDocs
    }
}

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setDocsThunk = () => (dispatch) => {
    docsApi.getDocs()
        .then(res => {
            dispatch(setDocs(res))
        })
}

export const setTestDocsThunk = () => (dispatch) => {
    docsApi.getTestDocs()
        .then(res => {
            dispatch(setTestDocs(res))
        })
}

export const setUsersThunk = () => (dispatch) => {
    usersApi.getUsers()
        .then(res => {
            dispatch(setUsers(res))
        })
}
