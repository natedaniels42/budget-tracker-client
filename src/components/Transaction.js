import React, { useState } from 'react';
import '../App.css';

const Transaction = (props) => {
    const { transaction } = props;
    const [update, setUpdate] = useState(false);
    const [inputs, setInputs] = useState(transaction);
    
    const handleClick = () => {
        setUpdate(true);
    }

    const handleChange = ({ target }) => {
        setInputs(inputs => ({...inputs, [target.name]: target.value}));
    }
    
    return (
        <tr>
            <td>{transaction.name}</td>
            <td>${transaction.amount}</td>
            <td>{transaction.date}</td>
            <td>
                {!update && <button onClick={handleClick}>Update</button>}
                {update && (
                    <form>
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

export default Transaction;