import axios from "axios";

export const docsApi = {
    getDocs: () => {
        return axios.get(`http://127.0.0.1:8000/docs/doc/`)
            .then(response => response.data)
    },
    getTestDocs: () => {
        return axios.get(`http://127.0.0.1:8000/test-docs/`)
            .then(response => response.data)
    },
}

export const usersApi = {
    getUsers: () => {
        return axios.get(`http://127.0.0.1:8000/computers/users/`)
            .then(response => response.data)
    },
}