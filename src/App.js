import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Transactions from './components/Transactions';
import TransactionsModel from './models/Transactions';

import './App.css';

const App = (props) => {
  const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [budget, setBudget] = useState(2000);
  const [color, setColor] = useState('green');
  const [on, setOn] = useState(false);
  const [inputs, setInputs] = useState({});
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    TransactionsModel.getAllTransactions()
      .then((result) => {
        let sum = 0;
        const current = result.filter(transaction => 
          new Date(transaction.date).getFullYear() === year 
          && new Date(transaction.date).getMonth() === month);
        setCurrentTransactions(current);
        current.forEach(transaction => sum += Number(transaction.amount));
        setColor(budget > 0 ? 'green' : 'red');
        setBudget((2000 - sum).toFixed(2));
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
    setUpdate(false);
    props.history.push('/index');
  }

  const handleDelete = (transaction) => {
    TransactionsModel.deleteTransaction(transaction._id)
      .then((result) => props.history.push('/'))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <h1>{months[month]} {year}</h1>
      <label htmlFor="date">Change Month:</label>
      <input id="date" name="date" type="date" onChange={handleDateChange}/>
      <p>Current Budget: <span className={color}>{budget}</span></p>
      <Transactions 
        transactions={currentTransactions} 
        handleChange={handleChange} 
        on={on} 
        setOn={setOn} 
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        update={update}
        setUpdate={setUpdate}
        handleDelete={handleDelete} />
    </div>
  );
}

export default withRouter(App);
