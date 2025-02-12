import { useContext } from "react";
import { WalletContext } from "../context/WalletProvider";
import { useRouter } from "next/router";

const Home = () => {
  const { wallet, connectWallet } = useContext(WalletContext);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        NFT Minter
      </h1>
      <p className="text-lg text-gray-400 mt-4">Mint and view your NFTs seamlessly.</p>

      {!wallet ? (
        <button
          onClick={connectWallet}
          className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => router.push("/mint")}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Mint NFT
          </button>
          <button
            onClick={() => router.push("/mynfts")}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            My NFTs
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
