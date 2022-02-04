
const { ethers } = require("hardhat");

describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
    // const Market = await ethers.getContractFactory("NFTMarket")
    // const market = await Market.deploy()
    // await market.deployed()
    // console.log("market address:", market.address)
    // /* deploy the NFT contract */
    // const NFT = await ethers.getContractFactory("NFT")
    // const nft = await NFT.deploy(market.address)
    // console.log("nft address:", nft.address)

    // await nft.addCollection("shiba", "hddksk", 50000, 10);
    // console.log("========= mint market items by owner ==========");
    // const tokenId = await nft.getCurrentTokenId();
    // const collectionId = await nft.getCurrentCollectionId();
    // console.log("token id: %s, %s", tokenId, collectionId);
    // const price = await nft.getMintingPrice();
    // console.log("price:", price.toNumber());

    // await nft.mintToken(collectionId);
    // console.log("minted successfully.");

    // console.log("========= create market items ==========");
    // market.createMarketItem(nft.address, tokenId, collectionId, 10000);
    // console.log("created market item");

    // const currentItem = await market.getCurrentItemId();
    // market.buyMarketSale(nft.address, currentItem);
    // console.log("buyed market item");

    // await market.addCollectionToWhitelist("0x3F56f5Ba5729DB6Bd5679f4474aAE437C1374Dc0", [1]);
    // console.log("added a whitelist address");


    // const addrMarket = "0x6BEc54C44F2159b93F32C802a472b4C597548186";
    // const addrCoin = "0xaedE035C3c14eC50Ddf8EAF9007a4699d261b5Ae";
    // const addrNft = "0xF4d6dee1B53e71CB6637883CAE15Dbc180dabC7C";

    // const NftMarket = await ethers.getContractFactory("NFTMarket");
    // const contractMarket = await NftMarket.attach(addrMarket);

    // const Nft = await ethers.getContractFactory("Adamant");
    // const contractNft = await Nft.attach(addrNft);

    // const Adamant = await ethers.getContractFactory("Adamant");
    // const contractAdam = await Adamant.attach(addrCoin);

    // const lp = await contractMarket.getCurrentItemId();
    // let test = await contractNft.getCurrentTokenId();
    // // contractAdam.approve(addrMarket, );
    // // console.log("market: ", contractMarket);
    // console.log("current token id : ", test);

  })
})