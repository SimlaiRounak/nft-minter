const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMint", function () {
  let NFTMint, nftMint, owner, addr1, addr2;

  beforeEach(async function () {
    NFTMint = await ethers.getContractFactory("NFTMint");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    nftMint = await NFTMint.deploy("TestNFT", "TNFT");
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await nftMint.name()).to.equal("TestNFT");
    expect(await nftMint.symbol()).to.equal("TNFT");
  });

  it("Should mint an NFT successfully", async function () {
    const tokenURI = "ipfs://QmExampleHash";
    
    await nftMint.mintNFT(addr1.address, tokenURI);
    expect(await nftMint.ownerOf(0)).to.equal(addr1.address);
    expect(await nftMint.tokenURI(0)).to.equal(tokenURI);
  });

  it("Should increment token ID after minting", async function () {
    await nftMint.mintNFT(addr1.address, "ipfs://QmHash1");
    await nftMint.mintNFT(addr2.address, "ipfs://QmHash2");

    expect(await nftMint.ownerOf(0)).to.equal(addr1.address);
    expect(await nftMint.ownerOf(1)).to.equal(addr2.address);
  });

  it("Should only allow the owner to mint NFTs", async function () {
    await expect(
      nftMint.connect(addr1).mintNFT(addr1.address, "ipfs://QmHash1")
    ).to.be.reverted;
  });

  it("Should transfer an NFT between accounts", async function () {
    await nftMint.mintNFT(owner.address, "ipfs://QmHash");

    await nftMint.transferFrom(owner.address, addr1.address, 0);
    expect(await nftMint.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should fail transferring a non-owned NFT", async function () {
    await nftMint.mintNFT(owner.address, "ipfs://QmHash");

    await expect(
      nftMint.connect(addr1).transferFrom(owner.address, addr2.address, 0)
    ).to.be.reverted;
  });
});