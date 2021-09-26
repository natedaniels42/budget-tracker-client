import React, { useState, useEffect } from 'react';
import Transactions from './Transactions';


const Home = (props) => {
    const [expenses, setExpenses] = useState(0); 
    const [currentTransactions, setCurrentTransactions] = useState([])
    const [budget, setBudget] = useState(2000);
    const { transactions } = props;
    
    useEffect(() => {
        let sum = 0;
        let currentDate = new Date();
        const current = transactions.filter(transaction => new Date(transaction.date).getFullYear() === currentDate.getFullYear() && new Date(transaction.date).getMonth() === currentDate.getMonth());
        setCurrentTransactions(current);
        current.forEach(transaction => sum += Number(transaction.amount));
        setExpenses(sum.toFixed(2));
        setBudget(prev => prev - sum);
    }, []);

    return (
        <div>
            <h1>This is Home</h1>
            <p>Remaining budget: ${budget}</p>
            <Transactions transactions={transactions} />
        </div>
    )
}

export default Home;