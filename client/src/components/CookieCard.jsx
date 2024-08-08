import { useReadContract, useWriteContract } from "wagmi";
import { OracleProtocolAddress, OracularProtocolContract } from "../contracts/OracularProtocol";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CookieCard({ cookie }) {
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const { data: gossipNetworkAddress } = useReadContract({
    abi: OracularProtocolContract.abi,
    address: OracleProtocolAddress,
    functionName: 'getCookieMap',
    args: [BigInt(cookie.tokenId)+BigInt(1)],
  });

  // Convert gossipNetworkAddress to string for comparison
  const addressString = gossipNetworkAddress ? gossipNetworkAddress.toString() : "";

  const { writeContractAsync, data, isPending, isError, isSuccess } = useWriteContract();

  const reRoutetoHolder = () => {
    // Correctly add gossipNetworkAddress to the newCookie object
    let newCookie = { ...cookie, networkAddress: gossipNetworkAddress };
    //console.log(newCookie);
    
    navigate('/cookie-holder', { state: { cookieObject: newCookie } }); // Ensure cookie is correctly passed
};


  const handleSendCookietoNetwork = async () => {
    if (addressString === "0x0000000000000000000000000000000000000000") {
      const modal = document.getElementById('my_modal_5');
      if (modal) {
        modal.showModal();
      }

      try {
        await writeContractAsync({
          abi: OracularProtocolContract.abi,
          address: OracleProtocolAddress,
          functionName: 'sendCookieToGossipNetwork',
          args: [BigInt(cookie.tokenId)+BigInt(1)]
        });
      } catch (error) {
        console.error('Error sending cookie to Gossip Network:', error);
      }
    } else {
      reRoutetoHolder();
    }
  };

  const fetchFromPinata = async (img_hash) => {
    let baseURL = `${import.meta.env.VITE_PINATA_GATEWAY}/${img_hash}?pinataGatewayToken=${import.meta.env.VITE_PINATA_GATEWAY_ACCESS_TOKEN}`;

    try {
      const res = await fetch(baseURL);
      if (!res.ok) {
        throw new Error(`Failed to fetch from Pinata: ${res.statusText}`);
      }
      const data = await res.json(); // Assuming the response contains JSON data
      baseURL = `${import.meta.env.VITE_PINATA_GATEWAY}/${data.image}?pinataGatewayToken=${import.meta.env.VITE_PINATA_GATEWAY_ACCESS_TOKEN}`;

      return baseURL; // Return the fetched image URL
    } catch (error) {
      console.error('Error fetching from Pinata:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = await fetchFromPinata(cookie.uri);
        setImageURL(imageURL);
      } catch (error) {
        console.error("Error fetching the image URL:", error);
      }
    };

    fetchImage();
  }, [cookie.uri]);

  useEffect(()=>{
    console.log(gossipNetworkAddress==="0x0000000000000000000000000000000000000000");
    
  },[])

  return (
    <div className="card bg-base-100 w-72 shadow-xl mb-4">
      <figure>
        {imageURL ? (
          <img src={imageURL} alt="Cookie Image" />
        ) : (
          <p>Loading image...</p>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">Cookie #{cookie.tokenId}</h2>
        <p className="text-left whitespace-normal break-words">
          <b>Crafted By: </b>{cookie.tokenOwner}
        </p>

        <div className="card-actions justify-center">
          <button onClick={handleSendCookietoNetwork} className="btn btn-primary">
            {addressString === "0x0000000000000000000000000000000000000000" ? "Start Gossip" : "View Gossip"}
          </button>

          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Sending Cookie to Gossip</h3>
              {isPending && !isError && !isSuccess && <p className="py-4">Transaction in Progress</p>}
              {!isPending && isError && !isSuccess && <p className="py-4 text-red-900">Transaction Failed</p>}
              {!isPending && !isError && isSuccess && (
                <p className="py-4 text-green-700 whitespace-normal break-words">
                  Transaction Successful! Hash: {data}
                </p>
              )}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
