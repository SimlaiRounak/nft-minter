import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTContractABI from "../utils/NFTContractABI.json";
import { toast } from "react-toastify";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is required!");
      return;
    }
  
    try {
      // Request account access (Triggers the MetaMask login popup)
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
      localStorage.setItem("connectedWallet", address);
      
      const nftContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        NFTContractABI.abi || NFTContractABI,
        signer
      );
      setContract(nftContract);
    } catch (error) {
      console.error("MetaMask login failed:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  }; 

  useEffect(() => {
    const reconnectWallet = async () => {
      const savedWallet = localStorage.getItem("connectedWallet");
      if (savedWallet && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          
          setWallet(address);
  
          const nftContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            NFTContractABI.abi || NFTContractABI,
            signer
          );
          setContract(nftContract);
        } catch (error) {
          console.error("Wallet reconnection failed:", error);
        }
      }
    };
  
    reconnectWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, contract }}>
      {children}
    </WalletContext.Provider>
  );
};