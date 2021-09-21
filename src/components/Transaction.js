import React from 'react';

const Transaction = (props) => {
    const { transaction } = props;

    return (
        <div>
            <p>{transaction.name}</p>
            <p>${transaction.amount}</p>
        </div>
    )
}

export default Transaction;