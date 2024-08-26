

//async function main() {

   // const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory")
   // const campaignFactory = await CampaignFactory.deploy();

   // await campaignFactory.deployed();

   // console.log("Factory deployed to:", campaignFactory.address);
//}   

//main()
   // .then(() => process.exit(0))
   // .catch((error) => {
    //    console.log(error);
   //     process.exit(1);
   // });
   
   const hre = require('hardhat');

async function main() {
    // Get the contract factory for CampaignFactory
    const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");

    // Deploy CampaignFactory contract to the default network (localhost)
    console.log("Deploying CampaignFactory to localhost...");
    const campaignFactory = await CampaignFactory.deploy();
    await campaignFactory.deployed();
    console.log("CampaignFactory deployed to localhost:", campaignFactory.address);

    // If the default network is not localhost, deploy to the specified network (polygon)
    if (hre.network.name !== 'localhost') {
        console.log(`Deploying CampaignFactory to network ${hre.network.name}...`);
        await campaignFactory.deployed();
        console.log(`CampaignFactory deployed to ${hre.network.name}:`, campaignFactory.address);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

   