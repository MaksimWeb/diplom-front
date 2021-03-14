import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import style from './UserTest.module.css'
import {Button, ButtonGroup, Paper, Typography} from "@material-ui/core";
import {quizChoiceThunk, showResults} from "../Redux/user-test-reducer";
import {NavLink, Redirect} from "react-router-dom";

const UserTest = () => {
    const quizSelector = useSelector(state => state.userTest.quiz);
    const dispatch = useDispatch();

    const [currentQuestion, setNextQuestion] = useState(0)

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
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

    return (
        <>
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
                                    <RadioGroup aria-label={value} name="user-quiz" value={value}
                                                onChange={handleChange} onKeyDown={handleKeyDown}>
                                        <FormControlLabel value={el.value}
                                                          control={<Radio/>}
                                                          label={el.value}/>
                                    </RadioGroup>
                                )
                            })
                        }
                    </FormLabel>
                </FormControl>
                <ButtonGroup className={style.buttonGroup}>
                    <Button disabled={disableNext()} onClick={() => {
                        setNextQuestion(currentQuestion + 1);
                        dispatch(quizChoiceThunk(value, currentQuestion))
                    }}>Следущий
                        вопрос</Button>
                    {
                        currentQuestion + 1 === quizSelector.length &&
                        <NavLink className={style.finishLink} to={'/user-results'}>
                            <Button variant='contained' onClick={() => {
                                dispatch(quizChoiceThunk(value, currentQuestion));
                                dispatch(showResults())
                            }}>Завершить
                                тест</Button>
                        </NavLink>
                    }
                </ButtonGroup>
            </Paper>
        </>
    )
}

export default UserTest;