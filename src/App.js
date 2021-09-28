import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Transactions from './components/Transactions';
import Deposits from './components/Deposits';
import TransactionsModel from './models/Transactions';
import DepositsModel from './models/Deposits';

import './App.css';


const App = (props) => {
  const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [currentDeposits, setCurrentDeposits] = useState([]);
  const [budget, setBudget] = useState(2000);
  const [color, setColor] = useState('green');
  const [on, setOn] = useState(false);
  const [inputs, setInputs] = useState({});
  const [add, setAdd] = useState(false);
  const [depositInputs, setDepositInputs] = useState({});
  
  useEffect(() => {
    DepositsModel.getAllDeposits()
      .then((result) => {
        TransactionsModel.getAllTransactions()
          .then((result2) => {
            let sum = 0;
            const transactions = result2.filter(transaction => 
              new Date(transaction.date).getFullYear() === year 
              && new Date(transaction.date).getMonth() === month);
            const deposits = result.filter(deposit => 
              new Date(deposit.date).getFullYear() === year 
              && new Date(deposit.date).getMonth() === month);
            setCurrentTransactions(transactions);
            setCurrentDeposits(deposits);
            transactions.forEach(transaction => sum += Number(transaction.amount));
            deposits.forEach(deposit => sum -= Number(deposit.amount));
            setColor(budget > 0 ? 'green' : 'red');
            setBudget((2000 - sum).toFixed(2));
          })
      })
  }, [currentTransactions, budget, month, year]);
  
  const handleChange = (event) => {
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    TransactionsModel.createTransaction(inputs)
      .then((result) => {
        console.log(result);
        setCurrentTransactions(prev => prev, result);
      })
    setOn(false);
    props.history.push('/');
  }

  const handleDateChange = ({ target }) => {
    const newDate = new Date(target.value);
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  }

  const handleUpdate = (transaction) => {
    TransactionsModel.updateTransaction(inputs, transaction._id)
        .then((result) => {
            console.log(result);
        })
    props.history.push('/');
  }

  const handleDelete = (transaction) => {
    TransactionsModel.deleteTransaction(transaction._id)
      .then((result) => props.history.push('/'))
      .catch((err) => console.log(err));
  }

  const handleDepositChange = ({ target }) => {
    setDepositInputs(inputs => ({...inputs, [target.name]: target.value}));
  }

  const handleNewDeposit = (event) => {
    event.preventDefault();
    DepositsModel.createDeposit(depositInputs)
      .then((result) => {
        console.log(result);
        setCurrentDeposits(prev => prev, result);
      })
    setAdd(false);
    props.history.push('/');
  }

  const handleDepositUpdate = (deposit) => {
    DepositsModel.updateDeposit(depositInputs, deposit._id)
      .then((result) => {
        console.log(result);
      })
    props.history.push('/');
  }

  return (
    <div className="App">
      <h1>{months[month]} {year}</h1>
      <label htmlFor="date">Change Month:</label>
      <input id="date" name="date" type="date" onChange={handleDateChange}/>
      <p>Current Budget: <span className={color}>{budget}</span></p>
      <h2>Transactions</h2>
      <Transactions 
        transactions={currentTransactions} 
        handleChange={handleChange} 
        on={on} 
        setOn={setOn} 
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete} />
      <h2>Deposits</h2>
      <Deposits 
        deposits={currentDeposits}
        add={add}
        setAdd={setAdd}
        handleDepositChange={handleDepositChange}
        handleNewDeposit={handleNewDeposit}
        handleDepositUpdate={handleDepositUpdate} />
    </div>
  );
}

export default withRouter(App);
