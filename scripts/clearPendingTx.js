const hre = require("hardhat");
require("dotenv").config();

async function clearPendingTransactions() {
  console.log("🚀 Checking for pending transactions...");

  const [signer] = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;
  const address = signer.address;

  console.log("🧑‍💻 Wallet Address:", address);

  // Get the latest nonce and the pending nonce
  const latestNonce = await provider.getTransactionCount(address, "latest");
  const pendingNonce = await provider.getTransactionCount(address, "pending");

  console.log(`🔢 Latest Nonce: ${latestNonce}`);
  console.log(`⏳ Pending Nonce: ${pendingNonce}`);

  if (pendingNonce > latestNonce) {
    console.log(`⚠️ Found ${pendingNonce - latestNonce} pending transactions. Clearing now...`);

    for (let nonce = latestNonce; nonce < pendingNonce; nonce++) {
      console.log(`🔄 Replacing pending transaction with nonce: ${nonce}`);

      const tx = {
        to: address, // Send to self
        value: hre.ethers.parseEther("0"), // Zero ETH
        gasLimit: 21000, // Minimum gas limit for simple transactions
        maxFeePerGas: hre.ethers.parseUnits("50", "gwei"), // Set high fee to confirm fast
        maxPriorityFeePerGas: hre.ethers.parseUnits("20", "gwei"),
        nonce, // Replace the pending transaction
      };

      try {
        const txResponse = await signer.sendTransaction(tx);
        console.log(`✅ Replacement TX sent: ${txResponse.hash}`);
      } catch (error) {
        console.error(`❌ Failed to replace transaction at nonce ${nonce}:`, error);
      }
    }
  } else {
    console.log("✅ No pending transactions found.");
  }
}

clearPendingTransactions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error clearing transactions:", error);
    process.exit(1);
  });