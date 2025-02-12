import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/WalletProvider";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const MyNFTs = () => {
  const { wallet, contract } = useContext(WalletContext);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState({});
  const [transferring, setTransferring] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (contract && wallet) {
      fetchNFTs();
    } else {
      setLoading(false);
    }
  }, [contract, wallet]);

  const fetchNFTs = async () => {
    setLoading(true);
    try {
      const transferEvents = await contract.queryFilter(contract.filters.Transfer(null, wallet));
      const nftList = await Promise.all(
        transferEvents.map(async (event) => {
          const tokenId = event.args.tokenId.toString();
          const tokenURI = await contract.tokenURI(tokenId);
          return { tokenId, tokenURI };
        })
      );
      setNfts(nftList);
    } catch (error) {
      toast.error("Error fetching NFTs.");
      console.error(error);
    }
    setLoading(false);
  };

  const transferNFT = async (tokenId) => {
    if (!recipients[tokenId]) return alert("Enter a recipient address");
    setTransferring({ ...recipients, [tokenId]: true })
    try {
      const tx = await contract.transferFrom(wallet, recipients[tokenId], tokenId);
      await tx.wait();
      setRecipients({})
      toast.success("NFT transferred successfully!");
      fetchNFTs();
    } catch (error) {
      toast.error("Error transferring NFT");
      console.error(error);
    }
    setTransferring({ ...recipients, [tokenId]: false })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-12 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
      >
        ← Back
      </button>
      
      <h1 className="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        My NFT Collection
      </h1>
      
      {loading ? (
        <div className="text-lg text-gray-400 animate-pulse">Loading NFTs...</div>
      ) : !wallet ? (
        <p className="text-lg text-gray-400">Connect your wallet to view your NFTs.</p>
      ) : nfts.length === 0 ? (
        <p className="text-lg text-gray-400">No NFTs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all border border-gray-700"
            >
              <img
                src={nft.tokenURI}
                alt={`NFT ${nft.tokenId}`}
                className="w-full h-60 object-cover rounded-lg border border-gray-600"
              />
              <p className="mt-4 text-center font-semibold text-lg text-white">Token ID: {nft.tokenId}</p>
              <input
                type="text"
                placeholder="Recipient Address"
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                value={recipients[nft.tokenId] || ""}
                onChange={(e) => setRecipients({ ...recipients, [nft.tokenId]: e.target.value })}
              />
              <button
                onClick={() => transferNFT(nft.tokenId)}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg w-full"
                disabled={transferring[nft.tokenId]}
              >
                {transferring[nft.tokenId] ? "Transferring..." : "Transfer NFT"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNFTs;