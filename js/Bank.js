class Bank {
    constructor(accountClientName, accountNumber) {
        this.accountClientName = accountClientName;
        this.accountNumber = accountNumber;
        this.registeredAccountArr = JSON.parse(localStorage.getItem('registeredAccounts')) || [];
        this.clientsArr = JSON.parse(localStorage.getItem('clients')) || [];
    }

    createAccount() {
        const findClient = this.clientsArr.find(client => client === this.accountClientName);
        const findAccount = this.existingAccount(this.accountClientName);
        if (!findClient || isNaN(this.accountNumber)) return;
        if (findAccount >= 0) {
            this.linkAccountToCustomer(this.registeredAccountArr[findAccount]);
            return;
        }
        
        this.registeredAccountArr.push({ accountClientName: this.accountClientName, accountNumber: [this.accountNumber], balance: 0 });
        this.saveLocalStorage(this.registeredAccountArr);
        window.location.reload();
    }

    existingAccount(registeredCustomerName) {
        const findAccount = this.registeredAccountArr.findIndex(({ accountClientName }) => accountClientName === registeredCustomerName);
        return findAccount;
    }

    linkAccountToCustomer(account) {
        account.accountNumber.push(this.accountNumber);
        const modifiedAccount = account;
        const index = this.existingAccount(modifiedAccount.accountClientName);
        this.registeredAccountArr[index] = account;
        this.saveLocalStorage(this.registeredAccountArr);
    }

    listRegisteredAccounts(input) {
        if (!this.registeredAccountArr.length) return;
        this.registeredAccountArr.forEach(client => {
            input.innerHTML += `
                <li>Nome: ${client.accountClientName}</li>
                <li>Numeros de conta: ${client.accountNumber}</li>
                <li>Saldo: ${client.balance}</li>
                <hr>
            `
        });
    }

    listClients(input) {
        this.clientsArr.forEach((client, index) => {
            input.innerHTML += `
                <li>Cliente N°${index}: ${client}</li>
            `
        });
    }

    saveLocalStorage(registeredAccount) {
        if (window.localStorage) {
            localStorage.setItem('registeredAccounts', JSON.stringify(registeredAccount));
        }
    }
}

export default Bank;