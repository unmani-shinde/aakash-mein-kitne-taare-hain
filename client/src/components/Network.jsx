import { useEffect, useState } from "react";
import { FetchCookiesMinted, FetchCookiesSentToGossip } from "../query/queryForCookiesMinted";
import CookieCard from "./CookieCard";
import { useAccount } from "wagmi";

export default function Network() {
  const [cookies, setCookies] = useState([]); // Ensure initial state is an array
  const [gossipCookies, setGossipCookies] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await FetchCookiesMinted();
        const cookieMinteds = response.cookieMinteds;
        setCookies(cookieMinteds);

        response = await FetchCookiesSentToGossip();
        let sendCookieToGossipNetworks = response.cookieSentToGossips;

        // Reduce the tokenId by 1 for each gossip cookie and find its corresponding uri from the cookies array
        sendCookieToGossipNetworks = sendCookieToGossipNetworks.map(gossipCookie => {
          const matchedCookie = cookieMinteds.find(cookie => cookie.tokenId === gossipCookie.tokenId - 1);
          return {
            ...gossipCookie,
            tokenId: gossipCookie.tokenId - 1,
            uri: matchedCookie ? matchedCookie.uri : null, // Add the uri if found
          };
        });

        setGossipCookies(sendCookieToGossipNetworks);
      } catch (error) {
        console.log("There was an error: ", error);
        setCookies([]); // Default to an empty array on error
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div
        className="card bg-base-300 rounded-box flex-grow items-center pt-8 lg:w-4/12"
        style={{ height: "580px", overflowY: "auto", overflowX: "hidden" }}
      >
        <p className="font-bold text-lg pb-4">My Cookies</p>

        {cookies.length > 0 ? (
          cookies
            .filter(cookie => cookie.tokenOwner === address.toLowerCase()) // Filter cookies by address
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
