import { useEffect, useState } from "react";
import { FetchCookiesMinted } from "../query/queryForCookiesMinted";
import CookieCard from "./CookieCard";
import { useAccount }from "wagmi"

export default function Network() {
  const [cookies, setCookies] = useState([]); // Ensure initial state is an array
  const { address } = useAccount();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await FetchCookiesMinted();
        const cookieMinteds = response.cookieMinteds;
        setCookies(cookieMinteds)
        
       
      } catch (error) {
        console.log("There was an error: ", error);
        setCookies([]); // Default to an empty array on error
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="card bg-base-300 rounded-box flex-grow items-center pt-8 lg:w-4/12" style={{ height: '580px', overflowY: 'auto', overflowX: 'hidden' }}>
        <p className="font-bold text-lg pb-4">My Cookies</p>

        {cookies.length > 0 ? (
  cookies
    .filter(cookie => cookie.tokenOwner === address.toLowerCase()) // Filter cookies by address
    .map((cookie, index) => (
      <CookieCard key={index} cookie={cookie} />
    ))
) : (
  <p>No cookies found.</p>
)}

      </div>

      <div className="divider lg:divider-horizontal">&</div>

      <div className="card bg-base-300 rounded-box flex-grow pt-8 lg:w-8/12">
        <p className="font-bold text-lg">Cookies In the Network</p>
      </div>
    </div>
  );
}
