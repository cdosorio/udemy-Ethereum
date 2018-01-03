var MultiNumberBettingV7 = artifacts.require("./MultiNumberBettingV7.sol");

/**
 * Test Case
 * 1. Create a winner (John) & a loser (Bill)
 * 2. Get last winner info - it should have John
 * 3. Add another winner (Frank)
 * 4. Get last winner info - it should have Frank
 * 5. Check if Bill is winning - should return false
 */

contract('MultiNumberBettingV7', function (accounts) {

  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address = accounts[2];


  it("should assert true", function () {
    var contractV7;
    
    return MultiNumberBettingV7.deployed().then(function (instance) {
      contractV7 = instance;

      // Send ethers to the contract - Truffle abstraction does not have a direct method            
      //contractV7.sendTransaction({ from: accounts[8], to: contractV7.address, value: web3.toWei(15, "ether") });
      contractV7.receiveEthers({ value: web3.toWei(10, "ether"), from: accounts[7] });

      return contractV7.getBalance.call();
    }).then(function (result) {
      console.log("Balance=", web3.fromWei(result.toNumber(), 'ether'));

      // Send a winner guess from John      
      return contractV7.guess(3, "John Miller", { from: johns_address, value: web3.toWei(1, "ether") });
    }).then(function(result){
      dumpEvents(result);
      
      // Send a losing guess from Bill
      return contractV7.guess(8, "Bill Tale", { from: bills_address, value: web3.toWei(1, "ether") });
    }).then(function(result){
      dumpEvents(result);

      // Get the last winner name
      return contractV7.getLastWinnerInfo.call();

    }).then(function (result) {
      // Result is an array: address, name, guess, guessedAt
      console.log('Amount: ' + web3.fromWei(result[4].toNumber(), 'ether'), result[1], 'Bet: ' + result[2].toNumber());

      // Check if Bill has won
      // Get the last winner name
      return contractV7.checkWinning.call(bills_address, { from: bills_address });
    }).then(function (result) {
      console.log("Bill Won?  ", result);

      return contractV7.getBalance.call();
    }).then(function (result) {
      console.log("Balance=", web3.fromWei(result.toNumber(), 'ether'));
      return contractV7.owner.call();
    }).then(function (result) {
      console.log("Dueno=", result);

      //retiro del dueno
      contractV7.ownerWithdraw(web3.toWei(3, "ether"));
      return contractV7.getBalance.call();
    }).then(function (result) {
      console.log("Balance post retiro=", web3.fromWei(result.toNumber(), 'ether'));      
    });
  });

});


// Truffle: you may access the log in receipt
function  dumpEvents(result){
  for(var i=0; i<result.logs.length;i++){
        console.log(result.logs[i].event,'>>', result.logs[i].args.name,' ',result.logs[i].args.amount.toNumber())
  }
}