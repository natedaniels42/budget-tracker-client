import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

const Transaction = (props) => {
    const { transaction, handleUpdate, handleChange, handleDelete } = props;
    const [update, setUpdate] = useState(false); 
    
    const handleClick = () => {
        update === false ? setUpdate(true) : setUpdate(false);
    }
    
    return (
        <tr>
            <td>{transaction.name}</td>
            <td>${transaction.amount}</td>
            <td>{transaction.date}</td>
            <td>
                {!update && <button onClick={handleClick}>Update</button>}
                {update && (
                    <form onSubmit={() => handleUpdate(transaction)}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" onChange={handleChange} /><br/>
                        <label htmlFor="amount">Amount:</label>
                        <input id="amount" name="amount" onChange={handleChange} /><br/>
                        <button>Update</button>
                    </form>
                )}
            </td>
            <td><button onClick={() => {
                handleDelete(transaction);
                handleClick()}}>Delete</button></td>
        </tr>
    )
}

export default withRouter(Transaction);