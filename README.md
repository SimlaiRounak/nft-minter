# NFT Minter

## Overview
This project is a decentralized application (dApp) that allows users to mint and transfer NFTs using an Ethereum smart contract. It is built with Solidity for the smart contract, Next.js/React for the frontend, and Ethers.js for interacting with the blockchain.

## Features
- Connect MetaMask Wallet
- Mint new NFTs
- View owned NFTs
- Transfer NFTs to another address
- Store metadata using IPFS

## Technologies Used
- **Solidity** (Smart contract development)
- **Next.js / React** (Frontend UI)
- **Ethers.js** (Blockchain interaction)
- **MetaMask** (Ethereum wallet integration)
- **Hardhat** (Smart contract development and testing)
- **IPFS** (NFT metadata storage)
- **Tailwind CSS** (Styling)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/nft-minting-dapp.git
cd nft-minting-dapp
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file and add the required keys:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_INFURA_ID=your_infura_project_id
```

### 4. Compile and Deploy Smart Contract
Ensure Hardhat is installed:
```sh
npm install --save-dev hardhat
```
Compile and deploy:
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

### 5. Run the Frontend
```sh
npm run dev
```

## Usage
1. Open the application in the browser (`http://localhost:3000`)
2. Click **Connect Wallet** to log in with MetaMask
3. Mint NFTs by entering metadata and clicking **Mint**
4. View owned NFTs under **My NFTs**
5. Transfer NFTs by entering a recipient's address and clicking **Transfer**

## Smart Contract
The smart contract `NFTMint.sol` implements ERC721 and includes:
- Minting NFTs (`mintNFT`)
- Transferring NFTs (`transferNFT`)
- Fetching token metadata (`tokenURI`)

## Wallet Persistence
The app stores the connected wallet address in **localStorage** and automatically reconnects when the page is refreshed.

## Contributing
Feel free to fork and submit a pull request if you want to improve this project!

## License
This project is licensed under the MIT License.
