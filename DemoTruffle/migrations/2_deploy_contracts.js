// var Calculator = artifacts.require("./Calculator.sol");
var MultiNumberBettingV7 = artifacts.require("./MultiNumberBettingV7.sol");
// var FuncTypes = artifacts.require("./FuncTypes.sol");
// var FuncTypesCaller = artifacts.require("./FuncTypesCaller.sol");
var ConstantsPayable = artifacts.require("./ConstantsPayable.sol");

module.exports = function(deployer) {
  // deployer.deploy(Calculator, 10); 
  deployer.deploy(MultiNumberBettingV7,1,3,9);
  // deployer.deploy(FuncTypes);
  // deployer.deploy(FuncTypesCaller);
  deployer.deploy(ConstantsPayable);
};
