class Client {
    constructor(name) {
        this.name = name;
        this.listOfAccounts = [];
    }

    addCustomerAccount(accountNumber) {
        this.listOfAccounts.push(accountNumber);
    }

    saveCustomer() {
        const clientsArr = JSON.parse(localStorage.getItem('clients')) || [];
        if (window.localStorage) {
            clientsArr.push(this.name);
            localStorage.setItem('clients', JSON.stringify(clientsArr));
        }
    }
}

export default Client;