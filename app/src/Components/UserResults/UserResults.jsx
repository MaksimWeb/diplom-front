import React from "react";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {connect, useSelector} from "react-redux";
import style from "./UserResults.module.css"
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {getQuestionsThunk} from "../Redux/admin-test-reducer";

const Circular = (props) => {
    return (
        <Box className={style.circle} position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    )
}

Circular.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const UserResult = (props) => {
    const resultSelector = useSelector(state => state.Test.results);

    return (
        <div className={style.circleCard}>
            <Card className={style.card} variant="outlined">
                <CardContent>
                    <Circular value={resultSelector}/>
                    <Typography variant={"h5"} color="textSecondary" gutterBottom>
                        Ваш результат теста
                    </Typography>
                </CardContent>
                <CardActions>
                    <NavLink className={style.link} to={`/test/${2}`}>
                        <Button onClick={props.getQuestionsThunk(2)} variant="contained" color="primary" size="small">Пройти тест заново</Button>
                    </NavLink>
                </CardActions>
            </Card>
        </div>

    )
}

export default connect (null, {getQuestionsThunk}) (UserResult);