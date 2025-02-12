import { WalletProvider } from "@/context/WalletProvider";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
    </>
  );
}
