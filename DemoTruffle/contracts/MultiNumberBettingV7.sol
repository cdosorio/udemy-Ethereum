pragma solidity ^0.4.4;

import "./MultiNumberBettingAbstractV3.sol"  ;

// Ex - 1 Part - 3
contract MultiNumberBettingV7 is MultiNumberBettingAbstractV3 {

  uint public  loserCount;
  uint public  winnerCount;
  uint public lastWinnerAt; 
  address winner;
  address   public owner;
  
  struct Winner {
    address winnerAddress;
    string  name;
    // Ex - 3 Part - 2
    uint    ethersReceived;
    uint    guess;
    uint    guessedAt;
  }
  
  mapping(address=>Winner) winnersMapping;

  uint8[3]  numArray;

  function MultiNumberBettingV7(uint8 num0, uint8 num1, uint8 num2) {
    // constructor
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
    owner = msg.sender;
  }

  // Ex - 3 Part - 1, Make guess payable
  function guess(uint8 num, string name) payable minimumBalance returns(bool)  {

    // If num > 10 throw
    if(num > 10) revert();
    //assert(num > 10;)

    // Ex - 4 Part - 1
    uint recvd = msg.value;
    if(recvd < MIN_BET || recvd > MAX_BET) 
       revert();

    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        // Increase the winner count
        winnerCount++;

        winnersMapping[msg.sender].winnerAddress = msg.sender;
        winnersMapping[msg.sender].name = name;
        winnersMapping[msg.sender].guess = num;
        winnersMapping[msg.sender].guessedAt = now;
        // Ex - 3 Part - 3
        winnersMapping[msg.sender].ethersReceived = msg.value;

        lastWinnerAt = winnersMapping[msg.sender].guessedAt;
        winner=msg.sender;

        // Ex - 4 Part - 2
        // Send the ethers - make sure you address the issue raised in 
        // Ex - 4 Part - 2 a
        //if(this.balance >= 2*msg.value) No es necesario porque ya lo valide con el Modifier.
        winner.transfer(2*msg.value);
        WinningBet(msg.sender, name, msg.value);
        return true;
      }
    }
    loserCount++;
    LosingBet(msg.sender, name, msg.value);
    return false;
  }

  function totalGuesses() returns (uint){
    return (loserCount+winnerCount);
  }

  // Ex - 4 Part - 4
  function getLastWinnerInfo() returns(address winnerAddress, 
                                        string  name, 
                                        uint    guess,
                                        uint    guessedAt,
                                        uint    ethersReceived){
    winnerAddress = winnersMapping[winner].winnerAddress;
    name =  winnersMapping[winner].name;
    guess = winnersMapping[winner].guess;
    guessedAt = winnersMapping[winner].guessedAt;
    ethersReceived= winnersMapping[winner].ethersReceived;
  }

  // Ex - 3 
  function checkWinning(address addr) returns(bool){    
    return (winnersMapping[addr].guessedAt != 0);
  }

// This function can receive ethers
  function receiveEthers()   payable   {

  }

  function  getBalance() returns (uint){
    return this.balance;
  }

  function ownerWithdraw (uint amount) minimumBalance ownerOnly returns (uint){
    owner.transfer(amount);
  }

  modifier  minimumBalance(){
    if(this.balance >= 2 * MAX_BET){
     _;
    } else {
      /**throw;*Deprecated*/
      revert();
    }
  }

  // Restricts execution by owner only
  modifier  ownerOnly {
    if(msg.sender == owner){
      _;
    } else {
      /**throw;*Deprecated*/
      revert();
    }
  }


  
}
