import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      payment: null,
      output: null,
      total: null,
      change: {
        twenties: 0,
        tens: 0,
        fives: 0,
        dollars: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0,
      },
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    return this.setState({
      [name]: value,
    });
  }

  calculate({ amountDue, amountReceived }) {
    //   add if statement to return function if values are incorrect

    const changeTotal = (Math.abs(amountReceived - amountDue)).toFixed(2);
    const total = (amountDue > amountReceived) ? 'Opps! You still owe $' + changeTotal : 'The total change due is $' + changeTotal;
    const effects = (amountDue > amountReceived) ? 'alert' : 'success';
    const elementArray = ['twenties', 'tens', 'fives', 'dollars', 'quarters', 'dimes', 'nickels', 'pennies'];
    const amounts = [20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];
    let changeDue = amountReceived - amountDue;
    //  creates copy of state.change
    const changeCopy = Object.assign({}, this.state.change);
    for (let i = 0; i < elementArray.length; i += 1) {
      let amountOutput;

      if (changeDue >= amounts[i]) {
        amountOutput = Math.floor(changeDue / amounts[i]);
        changeDue = (changeDue % amounts[i]).toFixed(2);
      } else {
        amountOutput = 0;
      }
      //  updates state.change copy
      changeCopy[elementArray[i]] = amountOutput;
    }
    this.setState({
      change: changeCopy,
      total,
      output: effects,
    });
    return;
  }

  render() {
    return (
      <div className="container">
        <div className="title">
          <h1 className="header">Change Calculator</h1>
          <hr className="line" />
        </div>
        <div className="input-div">
          <p className="input-p">Enter Information</p>
          <p className="input-label">How much is due?</p>
          <input className="input-field" name="amountDue" type="number" onChange={ this.onInputChange } />
          <p className="input-label">How much was received?</p>
          <input className="input-field" name="amountReceived" type="number" onChange={ this.onInputChange } />
          <div className="button-footer">
            <button className="submit" name="submit" onClick={ () => this.calculate(this.state) }>Calculate</button>
          </div>
        </div>
        <div className="output-div">
          <p id="output" className={ this.state.output }>{ this.state.total }</p>
          <label className="twenties money-label" htmlFor="twenties">
            Twenties
            <p className="money-output">{ this.state.change.twenties }</p>
          </label>
          <label className="tens money-label" htmlFor="tens">
            Tens
            <p className="money-output">{ this.state.change.tens }</p>
          </label>
          <label className="fives money-label" htmlFor="fives">
            Fives
            <p className="money-output">{ this.state.change.fives }</p>
          </label>
          <label className="ones money-label" htmlFor="ones">
            Ones
            <p className="money-output">{ this.state.change.dollars }</p>
          </label>
          <label className="quarters money-label" htmlFor="quarters">
            Quarters
            <p className="money-output">{ this.state.change.quarters }</p>
          </label>
          <label className="dimes money-label" htmlFor="dimes">
            Dimes
            <p className="money-output">{ this.state.change.dimes }</p>
          </label>
          <label className="nickels money-label" htmlFor="nickels">
            Nickels
            <p className="money-output">{ this.state.change.nickels }</p>
          </label>
          <label className="pennies money-label" htmlFor="pennies">
            Pennies
            <p className="money-output">{ this.state.change.pennies }</p>
          </label>

        </div>
      </div>
    );
  }
}

export default App;
