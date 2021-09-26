const url = 'http://localhost:4000/api/v1/transactions';

class TransactionsModel {
    static getAllTransactions = () => {
        return fetch(url)
            .then((response) => response.json());
    };

    static createTransaction = (transaction) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction)
        })
            .then((response) => response.json())
    };

    static updateTransaction = (transaction, id) => {
        return fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction)
        })
            .then((response) => response.json())
    }
}

export default TransactionsModel;