import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Routes from './config/routes';
import TransactionsModel from './models/Transactions';

import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    TransactionsModel.getAllTransactions()
      .then((result) => {
        setTransactions(result)
      })
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes transactions={transactions} />
    </div>
  );
}

export default App;
