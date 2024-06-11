class Client {
    constructor(name) {
        this.name = name;
    }

    saveCustomer() {
        const clientsArr = JSON.parse(localStorage.getItem('clients')) || [];
        if (window.localStorage) {
            clientsArr.push(this.name);
            localStorage.setItem('clients', JSON.stringify(clientsArr));
        }
        window.location.reload();
    }
}

export default Client;