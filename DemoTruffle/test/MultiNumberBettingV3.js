
var MultiNumberBettingV3 = artifacts.require("./MultiNumberBettingV3.sol");

contract('MultiNumberBettingV3', function(accounts) {
  it("should assert true", function() {
    var multi_number_betting_V3;    
    return MultiNumberBettingV3.deployed().then(function(instance){
      multi_number_betting_V3 = instance;
      
      // Send a losing guess
      multi_number_betting_V3.guess(18,"John Miller");         
     
      // Get the winner name
      return multi_number_betting_V3.getLastWinner.call();
    // }).then(function(result){
    //   console.log("Winner name= "+result);

    //   return multi_number_betting_V3.totalGuesses.call();
    // }).then(function(result){
    //   console.log("Total Guesses=",result.toNumber());

    //   // Send a winning gues
    //   multi_number_betting_V3.guess(9,"Bob Davis")
    //   return multi_number_betting_V3.totalGuesses.call();

    // }).then(function(result){
    //   console.log("Total Guesses=",result.toNumber());
      
    //    return multi_number_betting_V3.winnerCount();
    //  }).then(function(mm){
    //   console.log("winner Count mediante getter= " + mm);

    //   // Get the winner name
    //   return multi_number_betting_V3.getLastWinner.call();
    // }).then(function(result){
    //   console.log("Winner name= "+result);
    //   assert.isTrue((result) == 'Bob');     
    });   
  });
});