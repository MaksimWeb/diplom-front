import React, {useCallback, useEffect, useState} from "react";
import style from './ComputersList.module.css'
import Paper from "@material-ui/core/Paper";
import {
    Button,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {NavLink} from "react-router-dom";

export const ComputerList = () => {

    let filter = (computerName) => {
        let newComputersArr = computersList.filter(el => {
            let title = el.title
            if (title.includes(computerName.toUpperCase())) return true;

            return false;
        })

        newComputersArr.length >= 1 && setComputersList(newComputersArr)
    }

    let reset = () => {
        axios.get('http://127.0.0.1:8000/computers/')
            .then(response => {
                setComputersList(response.data)
            })
    }

    const [computersList, setComputersList] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/computers/')
            .then(response => {
                setComputersList(response.data)
            })
    }, [computersList])

    // let filter = useCallback((computerName) => {
    //
    //     let newComputersArr = computersList.filter(el => {
    //         let title = el.title
    //         if (title.includes(computerName.toUpperCase())) return true;
    //
    //         return false;
    //     })
    //
    //     newComputersArr.length >= 1 && setComputersList(newComputersArr)
    // }, [setComputersList])

    return (
        <div className={style.listBlock}>
            <FilterForm filter={filter} reset={reset}/>
            <TableContainer className={style.table} component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Название ПК</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            computersList.map((row) => (

                                <TableRow hover key={row.title}>
                                    <TableCell>
                                        <NavLink className={style.link} to={`/computer/${row.title}`}>
                                            {row.title}
                                        </NavLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const FilterForm = (props) => {

    return (
        <div className={style.filter}>
            <Formik
                initialValues={{
                    pcName: '',
                }}

                onSubmit={async (values) => {
                    props.filter(values.pcName);
                }}
            >
                {({values, errors, touched}) => (
                    <Form className={style.form}>
                        <InputLabel htmlFor='filterPC'>Фильтр списка</InputLabel>
                        <Field className={style.formField} id="filterPC" name="pcName"
                               placeholder="Введите название ПК"
                               as={TextField}/>

                        <div className={style.buttonsBlock}>
                            <Button variant='contained' color='primary' type="submit">Поиск</Button>
                            <Button variant='contained' color='secondary' onClick={() => {
                                props.reset();
                                values.pcName = ''
                            }}>Сброс</Button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}