import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletProvider";
import { useRouter } from "next/router";
import uploadToIPFS from "../utils/uploadToIPFS";
import { toast } from "react-toastify";

const MintNFT = () => {
  const { wallet, connectWallet, contract } = useContext(WalletContext);
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ name: "", description: "" });
  const [ipfsURL, setIpfsURL] = useState(null);
  const [ipfsLoading, setIpfsLoading] = useState(false);
  const [mintloading, setMintLoading] = useState(false);
  const router = useRouter();

  const formatIPFSURL = (ipfsHash) => {
    return ipfsHash.startsWith("ipfs://")
      ? `https://gateway.pinata.cloud/ipfs/${ipfsHash.split("ipfs://")[1]}`
      : ipfsHash;
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file!");
    setIpfsLoading(true);
    const ipfsURL = await uploadToIPFS(file);
    setIpfsLoading(false);
    if (ipfsURL) {
      setIpfsURL(formatIPFSURL(ipfsURL));
      toast.success("File uploaded to IPFS successfully!");
    }
  };

  const mintNFT = async () => {
    if (!contract || !ipfsURL) return toast.error("Upload metadata first!");
    setMintLoading(true);
    try {
      const tx = await contract.mintNFT(wallet, ipfsURL);
      await tx.wait();
      toast.success("NFT Minted Successfully!");
    } catch (error) {
      toast.error("Minting failed. Please try again.");
    }
    setMintLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
        Mint Your NFT
      </h1>
      {!wallet ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-white mb-4"
          />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setMetadata({ ...metadata, description: e.target.value })
            }
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg w-full"
            disabled={ipfsLoading || mintloading}
          >
            {ipfsLoading ? "Uploading..." : "Upload to IPFS"}
          </button>
          {ipfsURL && (
            <button
              onClick={mintNFT}
              className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg w-full"
              disabled={ipfsLoading || mintloading}
            >
              {mintloading ? "Minting..." : "Mint NFT"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MintNFT;
