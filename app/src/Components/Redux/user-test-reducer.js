const SET_SCORE = 'SET_SCORE'
const SET_CHOICE = 'SET_CHOICE'
const SET_RESULTS = 'SET_RESULTS'

let initialState = {
    quiz: [
        {
            question: 'Отметьте факторы, которыми определяется актуальность информационной безопасности в компании, организации и учреждении.',
            answers: [
                {
                    value: 'Обострением противоречий между объективно существующими потребностями общества в расширении свободного обмена информацией и чрезмерными или наоборот недостаточными ограничениями на ее распространение и использование',
                    correct: true
                },
                {
                    value: 'Огромным желанием генерального директора что-то защитить',
                    correct: false
                },
                {
                    value: 'Увеличением потерь (ущерба) от уничтожения, фальсификации, разглашения или незаконного тиражирования информации (возрастанием уязвимости различных затрагиваемых субъектов)',
                    correct: true
                },
                {
                    value: 'Cнижением уровня доверия к автоматизированным системам управления и обработки информации, использованием большего числа бумажных носителей',
                    correct: false
                },
            ]
        },
        {
            question: 'Выберите определение автоматизированной системы',
            answers: [
                {
                    value: 'Комплекс упорядоченной относительно постоянной информации на носителе данных, описывающей параметры и характеристики заданной области применения, и соответствующей документации, предназначенный для поставки пользователю',
                    correct: false
                },
                {
                    value: 'Совокупность работ от формирования исходных требований к системе до ввода в действие',
                    correct: false
                },
                {
                    value: 'Cистема, состоящая из персонала и комплекса средств автоматизации его деятельности, реализующая информационную технологию выполнения установленных функций',
                    correct: true
                },
                {
                    value: 'Устройство, предназначенное для ввода сигналов с объекта и вывода сигналов на объект',
                    correct: false
                },
            ]
        },
        {
            question: 'Безопасность любого компонента (ресурса) АС складывается из обеспечения трех его характеристик. Выберите данные характеристики',
            answers: [
                {
                    value: 'целостность, ясность, защищенность',
                    correct: false
                },
                {
                    value: 'защищенность, секретность, безопасность',
                    correct: false
                },
                {
                    value: 'конфиденциальность, ясность, доступность',
                    correct: false
                },
                {
                    value: 'конфиденциальность, целостность, доступность',
                    correct: true
                },
            ]
        },
        {
            question: 'Что из этого НЕ является основополагающим принципом информационной безопасности?',
            answers: [
                {
                    value: 'контроль над всеми операциями',
                    correct: false
                },
                {
                    value: 'минимум идентичных процедур',
                    correct: false
                },
                {
                    value: 'запрещено всё, что не разрешено',
                    correct: false
                },
                {
                    value: 'максимум привилегии пользователям',
                    correct: true
                },
            ]
        },
    ],
    score: null,
    choice: null,
    results: null
}

export const userTestReducer = (state = initialState, action) => {
    switch (action.type) {
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
            return {
                ...state,
                results: action.results
            }
        default:
            return state;
    }
}

let correctAnswers = 0
const setScore = (isCorrect) => {
    if (isCorrect) {
        correctAnswers++
    }

    return {
        type: SET_SCORE,
        score: correctAnswers
    }
}

export const quizChoice = (chosenAnswer) => {
    return {
        type: SET_CHOICE,
        chosenAnswer
    }
}

export const quizChoiceThunk = (choice, currentQuestion) => (dispatch) => {
    let chosenAnswer = initialState.quiz[currentQuestion].answers.filter(el => el.value === choice)
    dispatch(quizChoice(chosenAnswer))
    dispatch(setScore(chosenAnswer[0].correct))
}

export const showResults = () => {
    let results = Math.ceil(correctAnswers * 100 / initialState.quiz.length)
    correctAnswers = 0
    return {
        type: SET_RESULTS,
        results
    }
}
