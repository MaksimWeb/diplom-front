import {resultsAPI, testAPI} from "../../Api/Api";
import {useDispatch} from "react-redux";

const SET_QUESTIONS = 'SET_QUESTIONS'
const SET_SCORE = 'SET_SCORE'
const SET_CHOICE = 'SET_CHOICE'
const SET_RESULTS = 'SET_RESULTS'
const SET_ANSWERS = 'SET_ANSWERS'

let initialState = {
    quiz: [],
    score: null,
    choice: null,
    results: null
}

let stateCopy;
let resultsCopy;

export const adminTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            let quiz = []
            for (let i of action.questions) {
                let answers = action.answers.filter(el => el.question === i.id)
                quiz.push({question: i.text, answers: [...answers]})
            }
            return {
                ...state,
                quiz: [...quiz]
            }

        case SET_SCORE:
            return {
                ...state,
                score: action.score
            }
        case SET_CHOICE:
            return {
                ...state,
                choice: action.chosenAnswer
            }
        case SET_RESULTS:
            resultsCopy = action.results
            return {
                ...state,
                results: action.results
            }
        case SET_ANSWERS:
            stateCopy = [...state.quiz]
            return state

        default:
            return state;
    }
}

let correctAnswers = 0
const setScore = (answer, num) => {
    let numOfAns = 0;
    for (let i of answer) {
        if (i.correct && answer.length === 1 && num === 1) {
            correctAnswers++
        } else if (i.correct && answer.length !== 1) {
            numOfAns++
        }
    }

    if (num === 1) {
        return {
            type: SET_SCORE,
            score: correctAnswers
        }
    } else if (num !== 1 && numOfAns === num) {
        return {
            type: SET_SCORE,
            score: ++correctAnswers
        }
    } else {
        return {
            type: SET_SCORE,
            score: correctAnswers
        }
    }
}

export const quizChoice = (chosenAnswer) => {
    return {
        type: SET_CHOICE,
        chosenAnswer
    }
}

export const setAnswers = () => {
    return {
        type: SET_ANSWERS,
    }
}

export const quizChoiceThunk = (choice, currentQuestion) => (dispatch) => {
    dispatch(setAnswers())
    let chosenAnswer = stateCopy[currentQuestion].answers.filter(el => el.text === choice)
    let numOfCorrect = stateCopy[currentQuestion].answers.filter(item => item.correct === true)
    if (typeof choice === 'object') {
        chosenAnswer = stateCopy[currentQuestion].answers.filter(el => {
            for (let i of choice) {
                if (el.text === i) {
                    return true
                }
            }
        })
    }

    dispatch(quizChoice(chosenAnswer))
    dispatch(setScore(chosenAnswer, numOfCorrect.length))
}

export const showResults = () => {
    let results = Math.ceil(correctAnswers * 100 / stateCopy.length)
    correctAnswers = 0
    return {
        type: SET_RESULTS,
        results
    }
}

export const setTest = (questions, answers) => {
    return {
        type: SET_QUESTIONS,
        questions,
        answers
    }
}

export const getQuestionsThunk = (quizId) => (dispatch) => {
    testAPI.getQuestions()
        .then(res => res.filter(el => el.quiz === quizId))
        .then(res => {
            testAPI.getAnswers()
                .then(r => dispatch(getTestThunk(res, r)))
        })
}

export const getTestThunk = (questions, answers) => (dispatch) => {
    dispatch(setTest(questions, answers))
}

export const setResultsThunk = (quiz, user) => (dispatch) => {
    resultsAPI.setResults(parseInt(quiz), parseInt(user), resultsCopy)
        .then(res => console.log(res))
}