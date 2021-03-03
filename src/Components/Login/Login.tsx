import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";
import {InputLabel} from "@material-ui/core";
import style from './Login.module.css';
import {login} from '../../Redux/auth-reducer';
import {usersAPI} from "../../Api/Api";
import {BiShowAlt} from 'react-icons/bi';

export const Login: React.FC = () => {
    return (
        <div className={style.form}>
            <h1 className={style.h1}>LOGIN</h1>
            <LoginForm/>
        </div>
    )
}

const LoginForm = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    login: '',
                    email: '',
                    password: ''
                }}
                // validationSchema={SignupSchema}
                onSubmit={(values) => {
                    login(values.login, values.password, values.email)
                }}
            >
                {({values, errors, touched}) => (
                    <Form>
                        <InputLabel htmlFor='login'>Логин</InputLabel>
                        <Field className={style.input} id="login" name="login"
                               placeholder="Введите логин"
                               as={TextField}/>
                        <InputLabel htmlFor='email'>Почта</InputLabel>
                        <Field className={style.input} id="email" name="email"
                               placeholder="Введите почту"
                               as={TextField}/>
                        <InputLabel htmlFor='login'>Пароль</InputLabel>
                        <Field className={style.input} id="password" name="password"
                               placeholder="Введите пароль" type={passwordShown ? "text" : "password"}
                               as={TextField}/>
                        <BiShowAlt className={style.icon} onClick={togglePasswordVisiblity}/>
                        <Button className={style.button} variant='contained' color='primary'
                                type='submit'>Войти</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}