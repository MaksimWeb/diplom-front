import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import style from './Test.module.css'
import {Button, ButtonGroup, Checkbox, FormGroup, Paper, Typography} from "@material-ui/core";
import {quizChoiceThunk, setResultsThunk, showResults} from "../Redux/admin-test-reducer";
import {NavLink, withRouter} from "react-router-dom";

const Test = (props) => {

    let testID = props.match.params.id;

    const quizSelector = useSelector(state => state.Test.quiz);

    useEffect(() => {

    }, [quizSelector])

    const dispatch = useDispatch();

    const [currentQuestion, setNextQuestion] = useState(0)

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    let asnwersArray = []

    const handleCheckBoxChange = (event) => {
        if (event.target.name && event.target.checked) {
            asnwersArray.push(event.target.name)
        } else if (event.target.name && !event.target.checked) {
            asnwersArray.splice(asnwersArray.indexOf(event.target.name), 1)
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && (currentQuestion + 1 === quizSelector.length)) {
            return ''
        } else if (event.key === 'Enter') {
            setNextQuestion(currentQuestion + 1);
            dispatch(quizChoiceThunk(value, currentQuestion))
        }
    };

    let disableNext = () => {
        return currentQuestion + 1 === quizSelector.length
    }

    let numberOfAnswers = quizSelector[currentQuestion]?.answers.filter(a => a.correct === true)

    let dispatchMove = () => {
        setNextQuestion(currentQuestion + 1)
        if (numberOfAnswers.length === 1) {
            dispatch(quizChoiceThunk(value, currentQuestion))
        } else {
            dispatch(quizChoiceThunk(asnwersArray, currentQuestion))
            asnwersArray.length = 0
        }
    }

    return (
        <>
            {
                quizSelector.length === 0 ? <p>Loading</p> :


                    <Paper className={style.quizBlock}>
                        <Typography className={style.questionCount}
                                    variant={"h4"}>Вопрос {(quizSelector.indexOf(quizSelector[currentQuestion]) + 1)}/{parseInt(quizSelector.length)}</Typography>
                        <FormControl component="fieldset">
                            <FormLabel>
                                <p>
                                    {quizSelector[currentQuestion].question}
                                </p>
                                {
                                    quizSelector[currentQuestion].answers.map(el => {
                                        return (
                                            numberOfAnswers.length === 1 ?
                                                <RadioGroup aria-label={value} name="admin-quiz" value={value}
                                                            onChange={handleChange} onKeyDown={handleKeyDown}>
                                                    <FormControlLabel value={el.text}
                                                                      control={<Radio/>}
                                                                      label={el.text}/>
                                                </RadioGroup>
                                                :
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={handleCheckBoxChange}
                                                                           name={el.text}/>}
                                                        label={el.text}
                                                    />
                                                </FormGroup>
                                        )
                                    })
                                }
                            </FormLabel>
                        </FormControl>
                        <ButtonGroup className={style.buttonGroup}>
                            <Button disabled={disableNext()} onClick={() => {
                                dispatchMove()
                            }}>Следущий
                                вопрос</Button>
                            {
                                currentQuestion + 1 === quizSelector.length && testID === '1' &&
                                <NavLink className={style.finishLink} to={'/admin-results'}>
                                    <Button variant='contained' onClick={() => {
                                        dispatch(quizChoiceThunk(value, currentQuestion));
                                        dispatch(showResults());
                                        dispatch(setResultsThunk(testID, localStorage.getItem('userId')))
                                    }}>Завершить
                                        тест</Button>
                                </NavLink>
                            }
                            {
                                currentQuestion + 1 === quizSelector.length && testID === '2' &&
                                <NavLink className={style.finishLink} to={'/user-results'}>
                                    <Button variant='contained' onClick={() => {
                                        dispatch(quizChoiceThunk(value, currentQuestion));
                                        dispatch(showResults())
                                        dispatch(setResultsThunk(testID, localStorage.getItem('userId')))
                                    }}>Завершить
                                        тест</Button>
                                </NavLink>
                            }
                        </ButtonGroup>

                    </Paper>
            }
        </>
    )
}

export default withRouter(Test);