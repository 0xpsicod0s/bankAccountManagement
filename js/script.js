import Client from './Client.js';
import BankAccount from './BankAccount.js';
import Bank from './Bank.js';

const addClient = document.querySelector('#add-client');
const addAccount = document.querySelector('#add-account');
const executeOperation = document.querySelector('#execute-operation');

function createClient() {
    const clientName = document.querySelector('#client-name');
    const clientRegistered = new Client(clientName.value);
    clientRegistered.saveCustomer();
}

function createAccount() {
    const accountClientName = document.querySelector('#account-client-name');
    const accountNumber = document.querySelector('#account-number');
    const bank = new Bank(accountClientName.value, accountNumber.value);
    bank.createAccount();
}

function performOperation() {
    const operationAccountNumber = document.querySelector('#operation-account-number');
    const operationAmount = document.querySelector('#operation-amount');
    const operationType = document.querySelector('#operation-type');

    const bankAccount = new BankAccount(operationAccountNumber.value, operationAmount.value);

    switch (operationType.value) {
        case "deposit":
            bankAccount.deposit();
            break;
        case "withdraw":
            bankAccount.withdraw();
            break;
        case "transfer":
            const transferTargetAccount = document.querySelector('#transfer-target-account');
            bankAccount.transfer(transferTargetAccount.value);
            break;
    }
}

addClient.onclick = createClient;
addAccount.onclick = createAccount;
executeOperation.onclick = performOperation;
window.onload = listClients;