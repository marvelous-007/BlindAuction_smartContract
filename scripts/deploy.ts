import { ethers } from "hardhat";

async function main() {

  const [owner] = await ethers.getSigners();

  const NFTAuctionFactory = await ethers.getContractFactory("NFTBlindAuctionFactory");
  const nftAuctionFactory = await NFTAuctionFactory.deploy();
  await nftAuctionFactory.deployed();

  console.log("_________________________NFT FACTORY ADDRESS___________________________");

  console.log(`NFTBlindAuctionFactory: ${nftAuctionFactory.address}`);
  console.log(`owner address ${owner.address}`);

  console.log("_____________________New Blind Auction_______________________");

  const newNFTBlindAuction = await ethers.getContractAt("IBlindAuction", nftAuctionFactory.address);
  console.log("this is the interface and contract address" + newNFTBlindAuction);
  

  const _biddingTime = 300;
  const _revealTime = 300;
  const _nftContractAddress = "0x29d939322599381Aa09524277c590eca52A0640d";
  const _ownerAddress = "0xF72E1800c0ef2740B9AeB2Cdae499BDFa6fb9690";
  const _tokenId = 1;
  const _initialPrice = ethers.utils.parseEther("10");

  console.log("_____________________________Create Blind Auction______________________________");
  const newBlindAuction = await newNFTBlindAuction.createBlindAuction(
    _biddingTime,
    _revealTime,
    _nftContractAddress,
    _ownerAddress,
    _tokenId,
    _initialPrice
  );

  //console.log(await newBlindAuction.wait());
  //let event = await newBlindAuction.wait();
  //let newChild = event.events[0].args[0];

  // console.log(`This is the new blind auction ${newBlindAuction}`);
  console.log(`this is the event`);
 // console.log(event);
}

// We recommend this pattern to  able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
