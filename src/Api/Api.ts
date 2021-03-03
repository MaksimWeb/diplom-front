import axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/computers/',
    headers: {
        'API-KEY': 'ta78ce2cc80ee690486e485bf3668edecf74bba18'
    }
});

export const usersAPI = {
    getUsers: () => {
        return instance.get(`users/`)
            .then(response => console.log(response))
    },
    login: (username: string, password: string, email: string) => {
        return instance.post('rest-auth/login/', {username, password, email})
    },
}