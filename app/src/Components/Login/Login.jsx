import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";
import {InputLabel} from "@material-ui/core";
import style from './Login.module.css';
import {BiShowAlt} from 'react-icons/bi';
import {login} from "../Redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

export const Login = (props) => {

    if (props.isAuth) {
        return <Redirect to={'/computers'}/>
    }

    return (
        <div className={style.form}>
            <h1 className={style.h1}>LOGIN</h1>
            <LoginForm login={props.login} loading={props.loading}/>
        </div>
    )
}

const LoginForm = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div>
            {
                props.loading ?
                    <p>Loading...</p>

                    :

                    <Formik
                        enableReinitialize
                        initialValues={{
                            login: '',
                            password: ''
                        }}
                        // validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            props.login(values.login, values.password)
                        }}
                    >
                        {({values, errors, touched}) => (
                            <Form>
                                <InputLabel htmlFor='login'>Логин</InputLabel>
                                <Field className={style.input} id="login" name="login"
                                       placeholder="Введите логин"
                                       as={TextField}/>
                                {/*<InputLabel htmlFor='email'>Почта</InputLabel>*/}
                                {/*<Field className={style.input} id="email" name="email"*/}
                                {/*       placeholder="Введите почту"*/}
                                {/*       as={TextField}/>*/}
                                <InputLabel htmlFor='login'>Пароль</InputLabel>
                                <Field className={style.input} id="password" name="password"
                                       placeholder="Введите пароль" type={passwordShown ? "text" : "password"}
                                       as={TextField}/>
                                <BiShowAlt className={style.icon} onClick={togglePasswordVisiblity}/>
                                <Button className={style.button} variant='contained' color='primary'
                                        type='submit'>Войти
                                </Button>
                            </Form>
                        )}
                    </Formik>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isAuth: state.auth.token,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, {login})(Login)