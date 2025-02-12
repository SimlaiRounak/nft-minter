import axios from "axios";
import { toast } from "react-toastify";

const uploadToIPFS = async (file) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

    const formData = new FormData();
    formData.append("file", file);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretKey,
        },
      });

      console.log("IPFS CID:", response.data.IpfsHash);
      console.log(
        "IPFS URL:",
        `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(
        "IPFS Upload Error:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  } catch (ex) {
    console.error(ex)
    toast.error("Error uploading to IPFS storage.")
  }
};

export default uploadToIPFS;
