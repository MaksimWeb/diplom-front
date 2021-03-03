import React from 'react';
import './App.css';
import {ComputerList} from "./Components/Computers/ComputersList";
import {Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import {Login} from './Components/Login/Login';

function App() {
    return (
        <div>
            <Header/>
            <Route path='/computers' render={() => <ComputerList/>}/>
            <Route path='/login' render={() => <Login/>}/>
        </div>
    );
}

export default App;
