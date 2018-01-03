var MultiNumberBettingV5 = artifacts.require("./MultiNumberBettingV5.sol");

/**
 * Test Case
 * 1. Create a winner (John) & a loser (Bill)
 * 2. Get last winner info - it should have John
 * 3. Add another winner (Frank)
 * 4. Get last winner info - it should have Frank
 * 5. Check if Bill is winning - should return false
 */

contract('MultiNumberBettingV5', function(accounts) {

  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address= accounts[2];

  it("should assert true", function() {
    var multi_number_betting_V5;
    var bet1 = web3.toWei(1);

    return MultiNumberBettingV5.deployed().then(function(instance){
      multi_number_betting_V5 = instance;
      
      // Send a winner guess from John      
      multi_number_betting_V5.guess(3,"John Miller",{from:johns_address, value:bet1});
      // Send a losing guess from Bill
      multi_number_betting_V5.guess(8,"Bill Tale",{from:bills_address, value:bet1});
     
      // Get the last winner name
      return multi_number_betting_V5.getLastWinnerInfo.call();

    }).then(function(result){
      // Result is an array: address, name, guess, guessedAt
      console.log('Amount: ' + web3.fromWei(result[4].toNumber(),'ether'), result[1], 'Bet: ' + result[2].toNumber());

      // Send a winning guess from Frank
     
      multi_number_betting_V5.guess(9,"Frank Smith",{from:franks_address, value:bet1});
      // Send a losing guess from Bill
      multi_number_betting_V5.guess(10,"Bill Tale",{from:bills_address, value:bet1});
      

      // Get the last winner name
      return multi_number_betting_V5.getLastWinnerInfo.call();

    }).then(function(result){
      // Result is an array: address, name, guess, guessedAt
      console.log('Amount: ' + web3.fromWei(result[4].toNumber(),'ether'), result[1], 'Bet: ' + result[2].toNumber());

      // Check if Bill has won
      // Get the last winner name
      return multi_number_betting_V5.checkWinning.call(bills_address,{from:bills_address});
    }).then(function(result){
      console.log("Bill Won?  ",result);

      return multi_number_betting_V5.getBalance.call();
    }).then(function(result){
      console.log("Balance=", web3.fromWei(result.toNumber(),'ether'));
      
    });
  });
});