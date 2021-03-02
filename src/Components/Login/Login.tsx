import React from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";
import {InputLabel} from "@material-ui/core";
import style from './Login.module.css'

export const Login: React.FC = () => {
    return (
        <div className={style.form}>
            <h1 className={style.h1}>LOGIN</h1>
            <LoginForm/>
        </div>
    )
}

const LoginForm = () => {
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    login: '',
                    password: ''
                }}
                // validationSchema={SignupSchema}
                onSubmit={async (values) => {
                }}
            >
                {({values, errors, touched}) => (
                    <Form>
                        <InputLabel htmlFor='login'>Логин</InputLabel>
                        <Field id="login" name="login"
                               placeholder="Введите логин"
                               as={TextField}/>
                        <InputLabel htmlFor='login'>Пароль</InputLabel>
                        <Field id="password" name="password"
                               placeholder="Введите пароль"
                               as={TextField}/>
                        <Button className={style.button} variant='contained' color='primary' type='submit'>Войти</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}