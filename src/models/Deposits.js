const url = 'http://localhost:4000/api/v1/deposits';

class DepositsModel {
    static getAllDeposits = () => {
        return fetch(url)
            .then((response) => response.json());
    };

    static createDeposit = (deposit) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deposit)
        })
            .then((response) => response.json())
    };
}

export default DepositsModel;