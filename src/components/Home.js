import React from 'react';
import Transactions from './Transactions';


const Home = (props) => {
    const { transactions } = props;
    console.log(props);

    return (
        <div>
            <h1>This is Home</h1>
            <Transactions transactions={transactions} />
        </div>
    )
}

export default Home;