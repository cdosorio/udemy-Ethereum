pragma solidity ^0.4.4;

contract Calculator {
  //Adress en testRPC: 0x10514af9fc556c13531a9bff5206bfe470aded3f

  // Result of the operation are always stored in this variable
  uint result;//=10;

  function Calculator(uint initial) {
    // constructor
    result = initial;
    
  }

  // returns the result
  function getResult() returns (uint) {
    return result;
  }

  // result = result + num
  function addToNumber(uint num) {
    result += num;
  }

  // result = result - num
  function substractNumber(uint num)  {
    result -= num;
  }

  // result = result * num
  function multiplyWithNumber(uint num) {
    result *= num;
  }

  // result = result / num
  function divideByNumber(uint num) {
    result /= num;
  }

  function doblar() {
    result *= 2;
  }

  function half() {
    result /= 2;
  }
}
