import React from 'react';
import './App.css';
import {Navbar} from './Components/Navbar/Navbar';
import {ComputerList} from "./Components/Computers/ComputersList";
import { Route } from 'react-router-dom';

function App() {
  return (
      <div>
        <Navbar />
        <Route component={ComputerList} path='/computers'/>
      </div>
  );
}

export default App;
