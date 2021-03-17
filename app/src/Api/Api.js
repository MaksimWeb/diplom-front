import axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/computers/',
    headers: {
        'API-KEY': '2dc58bf2d48b1fb7da847d7728980ce67d126cf7'
    }
});

let test = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/questions',
    headers: {
        'API-KEY': '2dc58bf2d48b1fb7da847d7728980ce67d126cf7'
    }
});

let resultsList = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'API-KEY': '2dc58bf2d48b1fb7da847d7728980ce67d126cf7'
    }
});

export const usersAPI = {
    getUsers: () => {
        return instance.get(`users/`)
            .then(response => response.data)
    },
    login: (username, password) => {
        return instance.post('rest-auth/login/', {username, password})
    },
}

export const testAPI = {
    getQuestions: () => {
        return test.get('')
            .then(response => response.data)
    },
    getAnswers: () => {
        return test.get('answers/')
            .then(response => response.data)
    }
}

export const resultsAPI = {
    setResults: (quiz, user, score) => {
        debugger
        return resultsList.post('results/', {quiz, user, score})
    },
}