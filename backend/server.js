require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const { JsonRpcProvider, Contract } = require("ethers");

const app = express();
const abi = JSON.parse(fs.readFileSync("../artifacts/contracts/NFTMint.sol/NFTMint.json")).abi;
const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, provider);

mongoose.connect(process.env.MONGO_URI);

const NFT = mongoose.model("NFT", new mongoose.Schema({
  tokenId: { type: String, required: true },
  owner: { type: String, required: true },
  metadataURI: { type: String, required: true },
}));

contract.on("Transfer", async (from, walletAddress, tokenId) => {
  console.log(`NFT Transferred: ${tokenId} from ${from} to ${walletAddress}`);

  const existingNFT = await NFT.findOne({ tokenId });

  if (existingNFT) {
    existingNFT.owner = walletAddress;
    await existingNFT.save();
  } else {
    await NFT.create({ tokenId: tokenId.toString(), owner: walletAddress, metadataURI: `https://ipfs.io/ipfs/${tokenId}` });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));