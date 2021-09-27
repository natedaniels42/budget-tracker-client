import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TransactionsModel from '../models/Transactions';
import '../App.css';

const Transaction = (props) => {
    const { transaction, history } = props;
    const [update, setUpdate] = useState(false);
    const [inputs, setInputs] = useState(transaction);

    const handleClick = () => {
        setUpdate(true);
    }

    const handleChange = ({ target }) => {
        setInputs(inputs => ({...inputs, [target.name]: target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        TransactionsModel.updateTransaction(inputs, transaction._id)
            .then((result) => {
                console.log(result);
            })
        setUpdate(false);
        history.push('/index');
    }
    
    return (
        <tr>
            <td>{transaction.name}</td>
            <td>${transaction.amount}</td>
            <td>{transaction.date}</td>
            <td>
                {!update && <button onClick={handleClick}>Update</button>}
                {update && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" value={inputs.name} onChange={handleChange} /><br/>
                        <label htmlFor="amount">Amount:</label>
                        <input id="amount" name="amount" value={inputs.amount} onChange={handleChange} /><br/>
                        <button>Update</button>
                    </form>
                )}
            </td>
            <td><button>Delete</button></td>
        </tr>
    )
}

export default withRouter(Transaction);