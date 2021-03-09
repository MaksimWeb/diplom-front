import React, {useEffect} from 'react';
import './App.css';
import ComputerList from "./Components/Computers/ComputersList";
import {Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import ComputerProfile from "./Components/Computers/ComputerProfile/ComputerProfile";
import {connect} from "react-redux";
import {authCheckState} from "./Components/Redux/auth-reducer";

function App(props) {

    useEffect(() => {
        props.onTryAutoSignup()
    },)

    return (
        <div>
            <div>
                <Header/>
                <Route path='/computers' render={() => <ComputerList/>}/>
                <Route path={'/computer/:title?'} render={() => <ComputerProfile/>}/>
                <Route path='/login' render={() => <Login/>}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
