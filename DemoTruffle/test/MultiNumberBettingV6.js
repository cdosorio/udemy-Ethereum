var MultiNumberBettingV6 = artifacts.require("./MultiNumberBettingV6.sol");

/**
 * Test Case
 * 1. Create a winner (John) & a loser (Bill)
 * 2. Get last winner info - it should have John
 * 3. Add another winner (Frank)
 * 4. Get last winner info - it should have Frank
 * 5. Check if Bill is winning - should return false
 */

contract('MultiNumberBettingV6', function (accounts) {

  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address = accounts[2];


  it("should assert true", function () {
    var contractV6;

    return MultiNumberBettingV6.deployed().then(function (instance) {
      contractV6 = instance;

      // Send ethers to the contract - Truffle abstraction does not have a direct method            
      //contractV6.sendTransaction({ from: accounts[8], to: contractV6.address, value: web3.toWei(15, "ether") });
      contractV6.receiveEthers({ value: web3.toWei(10, "ether"), from: accounts[7] });

      return contractV6.getBalance.call();
    }).then(function (result) {
      console.log("Balance=", web3.fromWei(result.toNumber(), 'ether'));

      // Send a winner guess from John      
      contractV6.guess(3, "John Miller", { from: johns_address, value: web3.toWei(1, "ether") });
      // Send a losing guess from Bill
      contractV6.guess(8, "Bill Tale", { from: bills_address, value: web3.toWei(1, "ether") });

      // Get the last winner name
      return contractV6.getLastWinnerInfo.call();

    }).then(function (result) {
      // Result is an array: address, name, guess, guessedAt
      console.log('Amount: ' + web3.fromWei(result[4].toNumber(), 'ether'), result[1], 'Bet: ' + result[2].toNumber());

      // Check if Bill has won
      // Get the last winner name
      return contractV6.checkWinning.call(bills_address, { from: bills_address });
    }).then(function (result) {
      console.log("Bill Won?  ", result);

      return contractV6.getBalance.call();
    }).then(function (result) {
      console.log("Balance=", web3.fromWei(result.toNumber(), 'ether'));
      return contractV6.owner.call();
    }).then(function (result) {
      console.log("Dueno=", result);

      //retiro del dueno
      contractV6.ownerWithdraw(web3.toWei(3, "ether"));
      return contractV6.getBalance.call();
    }).then(function (result) {
      console.log("Balance post retiro=", web3.fromWei(result.toNumber(), 'ether'));
    });
  });


});