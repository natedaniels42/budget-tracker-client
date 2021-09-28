import React, { useState } from 'react';
import '../App.css';

const Deposit = (props) => {
    const { deposit, handleDepositChange, handleDepositUpdate, handleDepositDelete } = props;
    const [update, setUpdate] = useState(false); 
    
    const handleClick = () => {
        update === false ? setUpdate(true) : setUpdate(false);
    }
    
    return (
        <tr>
            <td>{deposit.name}</td>
            <td>${deposit.amount}</td>
            <td>{deposit.date}</td>
            <td>
                {!update && <button onClick={handleClick}>Update</button>}
                {update && (
                    <form onSubmit={() => handleDepositUpdate(deposit)}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" onChange={handleDepositChange} /><br/>
                        <label htmlFor="amount">Amount:</label>
                        <input id="amount" name="amount" onChange={handleDepositChange} /><br/>
                        <button>Update</button>
                    </form>
                )}
            </td>
            <td><button onClick={() => handleDepositDelete(deposit)}>Delete</button></td>
        </tr>
    )
}

export default Deposit;