import {SET_DOCS, SET_TEST_DOCS, SET_USERS} from "./Actions/ActionTypes/ActionTypes";

const initialState = {
    docs: [],
    testDocs: [],
    users: []
}

const DocsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOCS: {
            return {
                ...state,
                docs: action.docs
            }
        }
        case SET_TEST_DOCS: {
            return {
                ...state,
                testDocs: action.testDocs
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return state
    }
}

export default DocsReducer;