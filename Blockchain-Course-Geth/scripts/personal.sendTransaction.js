/**
 * Shows the use of personal.sendTransaction
 * 
 * To run this script:
 * 1. Attach to the running geth node
 * 2. Type the lines (or cut/paste) to interactive console OR
 * 2. Type & hit enter >>  loadScript("./scripts/sendTransaction.js")
 */
from = personal.listAccounts[0]
to = personal.listAccounts[1]

// Convert 0.001 ethers to Wei
amount = web3.toWei(1);
console.log(amount);
/* // Transaction object
txn = {
    from: from,
    to: to,
    value: amount
}

// Send the transaction
addr = personal.sendTransaction(txn, "lonewolf")

// Print to cnsole
console.log('Transaction created: ', addr) */