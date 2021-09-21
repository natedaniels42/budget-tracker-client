const url = 'http://localhost:4000/api/v1/transactions';

class TransactionsModel {
    static getAllTransactions = () => {
        return fetch(url)
            .then((response) => response.json());
    };
}

export default TransactionsModel;