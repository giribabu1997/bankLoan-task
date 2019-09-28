import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Loan from './Loan/Loan';
export default class App extends Component {
  render(){
    return(
      <div>
        <Loan/>
      </div>
    )
  }
}
