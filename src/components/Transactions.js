import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Transaction from './Transaction';
import TransactionsModel from '../models/Transactions';
import '../App.css';

const Transactions = (props) => {
    const [on, setOn] = useState(false);
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        TransactionsModel.createTransaction(inputs)
            .then((result) => {
                console.log(result);
            })
        setOn(false);
        props.history.push('/');
    }

    return (
        <div>
            {!on && <button onClick={() => setOn(true)}>New Transaction</button>}
            {on && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" onChange={handleChange} />
                    <label htmlFor="amount">Amount:</label>
                    <input name="amount" type="number" step="0.01" onChange={handleChange} />
                    <button type="submit">Add Transaction</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {props.transactions.map(transaction => <Transaction transaction={transaction} />)}
                </tbody>
            </table>
        </div>
    )
}

export default withRouter(Transactions);