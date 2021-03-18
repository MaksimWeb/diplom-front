import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import style from "./ResultList.module.css"
import Paper from "@material-ui/core/Paper";
import {NavLink} from "react-router-dom";
import axios from "axios";

const ResultList = (props) => {

    const [resultList, setResultList] = useState([])


    useEffect(() => {
        let getResults = axios.get(`http://127.0.0.1:8000/results`)
        axios.all([getResults])
            .then(axios.spread((...responses) => {
                console.log(responses[0].data)
                setResultList(responses[0].data)
            }))
    }, [])

    // const [r, setR] = useState([])
    //
    // for (let i of resultList) {
    //     for (let o of quizList) {
    //         if (i.quiz === o.id) {
    //             setR({
    //                 quiz: o.topic,
    //
    //             })
    //         }
    //     }
    // }

    return (
        <div>
            <TableContainer className={style.table} component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Название теста</TableCell>
                            <TableCell align="left">Пользователь</TableCell>
                            <TableCell align="left">Результат</TableCell>
                            <TableCell align="left">Дата</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            resultList.map((row) => (

                                <TableRow hover key={row.title}>
                                    <TableCell align="left">{row.quiz.topic}</TableCell>
                                    <TableCell align="left">{row.user.username}</TableCell>
                                    <TableCell align="left">{row.score} %</TableCell>
                                    <TableCell align="left">{row.created}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ResultList;