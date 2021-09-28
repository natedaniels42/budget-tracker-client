import React from 'react';
import Deposit from './Deposit';
import '../App.css';

const Deposits = (props) => {
    const { deposits, add, setAdd, handleDepositChange, handleNewDeposit, handleDepositUpdate } = props;
    
    return (
        <div>
            {!add && <button onClick={() => setAdd(true)}>New Deposit</button>}
            {add && (
                 <form onSubmit={handleNewDeposit}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" onChange={handleDepositChange} />
                    <label htmlFor="amount">Amount:</label>
                    <input name="amount" type="number" step="0.01" onChange={handleDepositChange} />
                    <button type="submit">Add Deposit</button>
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
                    {deposits.map(deposit => 
                        <Deposit 
                            deposit={deposit} 
                            key={deposit._id}
                            handleDepositChange={handleDepositChange}
                            handleDepositUpdate={handleDepositUpdate} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Deposits;