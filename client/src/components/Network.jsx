import { useEffect, useState } from "react";
import { FetchCookiesMinted, FetchCookiesSentToGossip } from "../query/queryForCookiesMinted";
import CookieCard from "./CookieCard";
import { useAccount, useReadContract } from "wagmi";
import { OracleProtocolAddress, OracleProtocolAddressCore } from "../contracts/OracularProtocol";
import { CookieContract } from "../contracts/Cookie";
import { ethers } from 'ethers';

async function readContract(abi, address, functionName, args = []) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(address, abi, provider);
    const result = await contract[functionName](...args);
    return result;
  } catch (error) {
    console.error('Error reading contract:', error);
    throw error;
  }
}
export default function Network() {
  const [cookies, setCookies] = useState([]); 
  const [gossipCookies, setGossipCookies] = useState([]);
  const { address,chainId } = useAccount();

  const baseUrl = "https://api.test.btcs.network/api"

  useEffect(() => {
    async function fetchData() {
      try {
        if (chainId === 1115) {
          const params = new URLSearchParams({
            module: 'account',
            action: 'tokennfttx',
            contractaddress: OracleProtocolAddressCore,
            startblock: '0',
            endblock: '99999999',
            sort: 'desc', // Fixing the sort order to 'desc'
            offset: '100',
            apikey: import.meta.env.VITE_CORE_API_KEY,
          });
  
          const params2 = new URLSearchParams({
            module: 'account',
            action: 'txlistinternal',
            address: OracleProtocolAddressCore,
            startblock: '0',
            endblock: '99999999',
            sort: 'desc', // Fixing the sort order to 'desc'
            offset: '100',
            apikey: import.meta.env.VITE_CORE_API_KEY,
          });
  
          const url = `${baseUrl}?${params.toString()}`;
          const response = await fetch(url);
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          //console.log(data,'data');
          
          const meow = [];

if (data?.result) {
  for (let i = 0; i < data.result.length; i++) {
    const txn = data.result[i];
    
    // Check if the transaction meets the criteria
    if (txn?.from === "0x0000000000000000000000000000000000000000" && txn?.to === address.toLowerCase()) {
      const tokenID = txn?.tokenID ? parseInt(txn.tokenID) : null; // Ensure tokenID is correctly parsed
      const tokenOwner = txn?.to || ''; // Ensure tokenOwner is set or default to empty string
      const transactionHash = txn?.hash || ''; // Ensure transactionHash is set or default to empty string
      
      // Create the item object
      const item = {
        tokenId: tokenID,
        tokenOwner: tokenOwner,
        transactionHash: transactionHash,
        uri: '' // Default uri
      };

      // Push the item to the meow array
      meow.push(item);
    }
  }
}

console.log("Meow Logged:", meow);





          
          setCookies(meow);

          const url2 = `${baseUrl}?${params2.toString()}`;
          const response2 = await fetch(url2);
          
          if (!response2.ok) {
            throw new Error(`HTTP error! status: ${response2.status}`);
          }
          
          const newData = await response2.json();
          
          const newMeow = [];
          
          for (const txn of newData.result) {
            if (txn.from === OracleProtocolAddressCore.toLowerCase() && txn.type === 'CREATE2') {
              try {
                const details = await readContract(CookieContract.abi, txn.to, 'spillTheTea', []);

                newMeow.push({
                  tokenId: details?.result?.tokenId || null,
                  tokenOwner: details?.result?.tokenOwner || '',
                  gossipNetworkId: txn.to,
                });
                
          
                // Create the object and add it to the array
                
              } catch (error) {
                console.error("Error reading contract data:", error);
              }
            }
          }
          
          setGossipCookies(newMeow); // Set gossip cookies for this chain
          
        } else if (chainId === 421614 || chainId === 80002) {
          const responseMinted = await FetchCookiesMinted(chainId);
          const cookieMinteds = responseMinted.cookieMinteds;
          setCookies(cookieMinteds);
  
          const responseGossip = await FetchCookiesSentToGossip(chainId);
          const sendCookieToGossipNetworks = responseGossip.cookieSentToGossips.map(gossipCookie => {
            const matchedCookie = cookieMinteds.find(cookie => BigInt(cookie.tokenId) === BigInt(gossipCookie.tokenId));
            return {
              ...gossipCookie,
              uri: matchedCookie ? matchedCookie.uri : null,
            };
          });
  
          setGossipCookies(sendCookieToGossipNetworks);
        }
      } catch (error) {
        console.error('There was an error retrieving the data:', error);
        setCookies([]); // Reset cookies state on error
        setGossipCookies([]); // Reset gossip cookies state on error
      }
    }
  
    fetchData();
  }, []); // Added dependencies to the useEffect to re-run when chainId or address changes
  

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div
        className="card bg-base-300 rounded-box flex-grow items-center pt-8 lg:w-4/12"
        style={{ height: "580px", overflowY: "auto", overflowX: "hidden" }}
      >
        <p className="font-bold text-lg pb-4">My Cookies</p>

        {cookies.length > 0 ? (
          cookies
            .filter(cookie => cookie.tokenOwner?.toLowerCase() === address.toLowerCase()) 
            .map((cookie, index) => <CookieCard key={index} cookie={cookie} />)
        ) : (
          <p>No cookies found.</p>
        )}
      </div>

      <div className="divider lg:divider-horizontal">&</div>

      <div className="card bg-base-300 rounded-box flex-grow pt-8 lg:w-10/12">
        <p className="font-bold text-lg">Cookies In the Gossip Network</p>
        {gossipCookies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {gossipCookies.map((cookie, index) => (
              <div key={index} className="p-2">
                <CookieCard cookie={cookie} />
              </div>
            ))}
          </div>
        ) : (
          <p>No cookies found.</p>
        )}
      </div>
    </div>
  );
}
