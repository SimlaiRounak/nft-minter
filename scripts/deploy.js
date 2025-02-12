const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Deploying contract to Sepolia...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const network = await hre.ethers.provider.getNetwork();
  console.log(`Network: ${network.name}`);

  // Get contract factory
  const NFTMint = await hre.ethers.getContractFactory("NFTMint");

  // Get Fee Data
  const feeData = await hre.ethers.provider.getFeeData();
  console.log("Fetched Fee Data:", feeData);

  // Check for stuck transactions
  const pendingTxCount = await hre.ethers.provider.getTransactionCount(deployer.address, "pending");
  console.log("Pending Transactions:", pendingTxCount);

  const latestNonce = await hre.ethers.provider.getTransactionCount(deployer.address, "latest");
  console.log("Latest Confirmed Nonce:", latestNonce);

  if (pendingTxCount > latestNonce) {
    console.log("⚠️ Stuck transactions detected! Consider clearing them first.");
  }

  // Deploy contract with manual nonce (if needed)
  const nftMint = await NFTMint.deploy("TestNFT", "TNFT");

  // Ensure deployment transaction exists
  const tx = nftMint.deploymentTransaction();
  if (!tx) {
    throw new Error("❌ Deployment transaction failed to create.");
  }

  console.log("📌 Transaction Hash:", tx.hash);
  console.log("⏳ Transaction sent, waiting for confirmation...");

  // Wait for deployment
  await nftMint.waitForDeployment();

  // Get deployed contract address
  const contractAddress = await nftMint.getAddress();
  console.log(`✅ Contract successfully deployed at: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });