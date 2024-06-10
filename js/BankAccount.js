class BankAccount {
    constructor(accountNumber, amount) {
        this.balance = 0;
        this.accountNumber = accountNumber;
        this.amount = +amount;
        this.registeredAccountArr = JSON.parse(localStorage.getItem('registeredAccounts')) || [];
    }

    deposit() {
        const accountFound = this.accountFindIndex();
        if (accountFound >= 0) {
            this.balance += this.amount;
            this.registeredAccountArr[accountFound].balance += this.balance;
            this.saveLocalStorage(this.registeredAccountArr);
        }
        window.location.reload();
    }

    withdraw() {
        const accountFound = this.accountFindIndex();
        if (this.amount < this.balance) return;
        if (accountFound >= 0) {
            this.registeredAccountArr[accountFound].balance -= this.amount;
            this.saveLocalStorage(this.registeredAccountArr);
        }
        window.location.reload();
    }

    transfer(targetAccount) {
        let accountFound;
        let accountName;
        for (const { accountClientName, accountNumber } of this.registeredAccountArr) {
            accountFound = accountNumber.find(number => number === targetAccount);
            if (accountFound) {
                accountName = accountClientName;
                break;
            }
        }
        if (this.checkBalance()) {
            const targetAccountIndex = this.registeredAccountArr.findIndex(({ accountClientName }) => accountClientName === accountName);
            const currentAccountIndex = this.accountFindIndex();
            this.registeredAccountArr[targetAccountIndex].balance += this.amount;
            this.registeredAccountArr[currentAccountIndex].balance -= this.amount;
            this.saveLocalStorage(this.registeredAccountArr);
        }
        window.location.reload();
    }

    checkBalance() {
        const accountFound = this.accountFindIndex();
        return this.registeredAccountArr[accountFound].balance > this.amount;
    }

    findAccount() {
        let lookForAccountNumber;
        for (const { accountClientName, accountNumber } of this.registeredAccountArr) {
            lookForAccountNumber = [accountNumber.find(number => number === this.accountNumber), accountClientName];
            if (lookForAccountNumber[0]) break;
            if (!lookForAccountNumber[0]) lookForAccountNumber = [];
        }
        return lookForAccountNumber;
    }

    accountFindIndex() {
        const accountFound = this.findAccount();
        return this.registeredAccountArr.findIndex(({ accountClientName }) => accountClientName === accountFound[1]);
    }

    saveLocalStorage(registeredAccount) {
        if (window.localStorage) {
            localStorage.setItem('registeredAccounts', JSON.stringify(registeredAccount));
        }
    }
}

export default BankAccount;