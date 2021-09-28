import React, { useState } from 'react';
import '../App.css';

const Deposit = (props) => {
    const { deposit } = props;
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
                    <form >
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" /><br/>
                        <label htmlFor="amount">Amount:</label>
                        <input id="amount" name="amount" /><br/>
                        <button>Update</button>
                    </form>
                )}
            </td>
            <td><button>Delete</button></td>
        </tr>
    )
}

export default Deposit;