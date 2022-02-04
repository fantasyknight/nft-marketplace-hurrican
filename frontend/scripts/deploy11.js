const hre = require("hardhat");
async function main() {
   //  const AdamantCoin = await hre.ethers.getContractFactory("Adamant");
   //  const adamant = await AdamantCoin.deploy();
   //  console.log("Adamant coin address:", adamant.address);

   const AdamantMarket = await hre.ethers.getContractFactory("AdamantMarket");
   const adamMarket = await AdamantMarket.deploy();
   console.log("Adamant Market address:", adamMarket.address);

    const AdamantNFT = await hre.ethers.getContractFactory("AdamantNFT");
    const adamNFT = await AdamantNFT.deploy(adamMarket.address);
    console.log("Adamant NFT address:", adamNFT.address);

}
 
main()
.then(() => process.exit(0))
.catch(error => {
   console.error(error);
   process.exit(1);
});