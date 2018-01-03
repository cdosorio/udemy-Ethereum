//with geth running -copy and paste this code to have a simple feedback of the blockchain syncing progress
//Type & hit enter >>  loadScript("./scripts/gethSyncingProgress.js")

var s = eth.syncing; 
console.log("\n------------ GETH SYNCING PROGRESS\nprogress: " 
+ (s.currentBlock/s.highestBlock*100)+ " %\nblocks left to parse: "
+ (s.highestBlock-s.currentBlock) 
+ "\ncurrent Block: " + s.currentBlock 
+ " of " + s.highestBlock)

//eth.blockNumber

//web3.eth.syncing