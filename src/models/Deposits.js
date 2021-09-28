const url = 'http://localhost:4000/api/v1/deposits';

class DepositsModel {
    static getAllDeposits = () => {
        return fetch(url)
            .then((response) => response.json());
    };
}

export default DepositsModel;