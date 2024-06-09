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
        
        this.registeredAccountArr.push({ accountClientName: this.accountClientName, accountNumber: [this.accountNumber] });
        this.saveLocalStorage(this.registeredAccountArr);
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

    saveLocalStorage(registeredAccount) {
        if (window.localStorage) {
            localStorage.setItem('registeredAccounts', JSON.stringify(registeredAccount));
        }
    }
}

export default Bank;