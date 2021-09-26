import React from 'react';

const Transaction = (props) => {
    const { transaction } = props;

    return (
        <tr>
            <td>{transaction.name}</td>
            <td>${transaction.amount}</td>
            <td>{transaction.date}</td>
        </tr>
    )
}

export default Transaction;