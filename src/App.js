import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Transactions from './components/Transactions';
import TransactionsModel from './models/Transactions';

import './App.css';

const App = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState(0); 
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [budget, setBudget] = useState(2000);
  const [color, setColor] = useState('green');
  const [on, setOn] = useState(false);
  const [inputs, setInputs] = useState({});
  
  useEffect(() => {
    TransactionsModel.getAllTransactions()
      .then((result) => {
        setTransactions(result);
        let sum = 0;
        let currentDate = new Date();
        const current = result.filter(transaction => 
          new Date(transaction.date).getFullYear() === currentDate.getFullYear() 
          && new Date(transaction.date).getMonth() === currentDate.getMonth());
        setCurrentTransactions(current);
        current.forEach(transaction => sum += Number(transaction.amount));
        setExpenses(sum.toFixed(2));
        setColor(budget - sum > 0 ? 'green' : 'red');
        setBudget((2000 - sum).toFixed(2));
      })
  }, [currentTransactions]);
  
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

  return (
    <div className="App">
      <p>Current Budget: <span className={color}>{budget}</span></p>
      <Transactions 
        transactions={currentTransactions} 
        handleChange={handleChange} 
        on={on} 
        setOn={setOn} 
        handleSubmit={handleSubmit} />
    </div>
  );
}

export default withRouter(App);
