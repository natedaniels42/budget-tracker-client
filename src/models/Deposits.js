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

    static updateDeposit = (deposit, id) => {
        return fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deposit)
        })
            .then((response) => response.json())
    }

    static deleteDeposit = (id) => {
        return fetch (`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
    } 
}

export default DepositsModel;