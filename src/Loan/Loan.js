import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Loan.css';
import axios from 'axios';
export default class Loan extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      amountValue: 500,
      monthsSelected: 6,
      min: 500,
      max: 5000,
      monthsMin: 6,
      monthsMax: 24,
      myData: false,
      myloan: {}
    }
  }


  handleChangeAmount = value => {
    this.setState({
      amountValue: value
    })
  };
  handleChangeMonth = value => {
    this.setState({
      monthsSelected: value
    })
  };

  handleCalculateInterest = () => {
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amountValue}&numMonths=${this.state.monthsSelected}`)
      .then(res => {
        this.setState({ myData: true, myloan: res.data })
        console.log(res)
      })

  }

  render() {
    const { amountValue, min, max, monthsMin, monthsMax, monthsSelected, myData, myloan } = this.state
    return (
      <div className="container cnt">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h6 className="text-info">Choose your Loan amount</h6>
            <div className='slider'>
              <Slider
                min={min}
                max={max}
                value={amountValue}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChangeAmount}
                onChangeComplete={this.handleChangeComplete} />

              <div className="row total-val">
                <div className="col-md-4">{min}$</div>
                <div className="col-md-4 text-center text-primary val-sz">{amountValue ? `${amountValue}$` : ''}</div>
                <div className="col-md-4 text-right">{max}$</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row months-selector mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h6 className="text-info">Select your months</h6>
            <div className='slider'>
              <Slider min={monthsMin}
                      max={monthsMax}
                      value={monthsSelected}
                      onChangeStart={this.handleChangeStart}
                      onChange={this.handleChangeMonth}
                onChangeComplete={this.handleChangeComplete} />

              <div className="row total-val">
                <div className="col-md-4">{monthsMin} months</div>
                <div className="col-md-4 text-center text-primary val-sz">{monthsSelected ? `${monthsSelected} months` : ''}</div>
                <div className="col-md-4 text-right">{monthsMax} months</div>
              </div>

            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button className="btn btn-outline-primary" onClick={this.handleCalculateInterest}>Calculate Interest</button>
          </div>
        </div>
        {myData && <div className="row mt-4">

          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 text-left">
                    <p>Selected Amount: <strong className="text-primary">{myloan.principal.amount}$</strong></p>
                    <p>Months Duration: <strong className="text-info">{myloan.numPayments}</strong></p>
                  </div>
                  <div className="col-md-6 text-left">
                    <p>Interest Rate: <strong className="text-warning">{myloan.interestRate}%</strong></p>
                    <p>Monthly Payment: <strong className="text-danger">{myloan.monthlyPayment.amount}$</strong></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span className="text-info">
                      Total Amount to pay <strong className="text-success">{myloan.numPayments * myloan.monthlyPayment.amount} $</strong>
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>}
      </div>

    );
  }
}