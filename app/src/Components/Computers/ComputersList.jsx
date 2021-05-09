import React, {useCallback, useEffect, useState} from "react";
import style from './ComputersList.module.css'
import Paper from "@material-ui/core/Paper";
import {
    Button, Container,
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
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const ComputerList = (props) => {

    const [computersList, setComputersList] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/computers/')
            .then(response => {
                setComputersList(response.data)
            })
    }, [])

    let reset = () => {
        axios.get('http://127.0.0.1:8000/computers/')
            .then(response => {
                setComputersList(response.data)
            })
    }

    let filter = useCallback((computerName) => {

        let newComputersArr = computersList.filter(el => {
            let title = el.title.toUpperCase()
            if (title.includes(computerName.toUpperCase())) return true;

            return false;
        })

        newComputersArr.length >= 1 && setComputersList(newComputersArr)
    }, [computersList])

    return (
       <Container maxWidth={"xl"}>
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
                                           {props.isAuth ?
                                               <NavLink className={style.link} to={`/computer/${row.title}`}>
                                                   {row.title}
                                               </NavLink>
                                               :
                                               <span>
                                                  {row.title}
                                            </span>
                                           }
                                       </TableCell>
                                   </TableRow>
                               ))}
                       </TableBody>
                   </Table>
               </TableContainer>
           </div>
       </Container>
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

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token
    }

}

export default connect(mapStateToProps, {}) (ComputerList)