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
https://github.com/SimlaiRounak/nft-minter.git
cd nft-minter  
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` / `.env` file and add the required keys:
* Root of the project
```env
PRIVATE_KEY=wallet_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
```

* Frontend `(./frontend)`
```env
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

* Backend `(./backend)`
```env
MONGO_URI=your_mongodb_url
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
CONTRACT_ADDRESS=deployed_contract_address
```

### 4. Compile and Deploy Smart Contract
Ensure Hardhat is installed:
```sh
npm install --save-dev hardhat
```
Compile and deploy:
```sh
npm run compile
npm run deploy
```

### 5. Run the Frontend & Backend
```sh
cd ./frontend/
npm run dev
```
```sh
cd ./backend/
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

## Contributing
Feel free to fork and submit a pull request if you want to improve this project!

## License
This project is licensed under the MIT License.
