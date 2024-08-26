require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: './.env.local' });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
   console.log(account.address);
  }
})

//const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

//module.exports = {
 // solidity: "0.8.19",
 // defaultNetwork: "localhost", // Default to localhost (Ganache)
 // networks: {
 //   localhost: {
   //   url: "http://localhost:7545",
   ////   chainId: 1337 // Ganache's default chain ID
   // },
  //  hardhat: {},
   // polygon: {
  //    url: process.env.NEXT_PUBLIC_RPC_URL,
  ///    accounts: [privateKey]
  //  }
 // }
//};

//require('dotenv').config(); // Load environment variables

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "localhost", // Default to localhost (Ganache)
  networks: {
    localhost: {
      url: "http://localhost:7545",
      chainId: 1337 // Ganache's default chain ID
    }
    
  }
};
