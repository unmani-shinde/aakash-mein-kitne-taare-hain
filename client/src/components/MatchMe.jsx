import { useEffect, useState, useRef } from "react";
import { FetchCookiesMinted } from "../query/queryForCookiesMinted";
import { useAccount } from "wagmi";
import { OracleProtocolAddressCore } from "../contracts/OracularProtocol";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function MatchMe() {
    const [cookies, setCookies] = useState([]);
    const { address, chainId } = useAccount();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [matchMade, setMatchMade] = useState('');

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    const baseUrl = "https://api.test.btcs.network/api"

    const match = async (otherCookies, myCookies) => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const other_cookies = JSON.stringify(otherCookies);
        const my_cookies = JSON.stringify(myCookies);

        const prompt = `
I have created the following cookies: ${other_cookies}. 
Additionally, here are the cookies created by other users on the platform: ${my_cookies}. 

Each cookie contains personalized horoscope predictions across four aspects:
- General Overview
- Finance and Career
- Personal Growth and Innovation
- Social and Relationship Dynamics

Please compare the cookies from ${other_cookies} with those from ${my_cookies} and identify which user address from ${other_cookies} is the most similar to ${my_cookies}. 

For the most similar user address, provide two short sentences in simple language detailing the nature of the similarity based on the horoscope predictions.
`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (chainId === 421614 || chainId === 80002) {
                    setLoading2(true);
                    const responseMinted = await FetchCookiesMinted(chainId);
                    setCookies(responseMinted.cookieMinteds);
                } else if (chainId === 1115) {
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

                    const url = `${baseUrl}?${params.toString()}`;
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    const meow = [];

                    if (data?.result) {
                        for (const txn of data.result) {
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

                    setCookies(meow);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                {
                    setLoading2(false);
                }
            }
        };

        fetchData();
    }, [chainId, address]); // Include chainId and address in the dependency array

    const fetchFromPinata = async (img_hash) => {
        let baseURL = `${import.meta.env.VITE_PINATA_GATEWAY}/${img_hash}?pinataGatewayToken=${import.meta.env.VITE_PINATA_GATEWAY_ACCESS_TOKEN}`;

        try {
            const res = await fetch(baseURL);
            if (!res.ok) {
                throw new Error(`Failed to fetch from Pinata: ${res.statusText}`);
            }
            const data = await res.json(); // Assuming the response contains JSON data
            return data;
        } catch (error) {
            console.error('Error fetching from Pinata:', error);
            throw error;
        }
    };

    const handleMatch = async () => {
        setLoading(true);
        let otherCookies = [];
        let myCookies = [];

        // Await promises in a loop for fetchFromPinata
        for (const cookie of cookies) {
            try {
                const resJSON = await fetchFromPinata(cookie.uri);
                const item = {
                    userAddress: cookie.tokenOwner,
                    prediction_general_overview: resJSON.prediction_general_overview,
                    prediction_finance_and_career: resJSON.prediction_finance_and_career,
                    prediction_personal_growth: resJSON.prediction_personal_growth,
                    prediction_social_relationships: resJSON.prediction_social_relationships
                };

                if (cookie.tokenOwner.toLowerCase() !== address.toLowerCase()) {
                    otherCookies.push(item);
                } else {
                    myCookies.push(item);
                }
            } catch (error) {
                console.error('Error processing cookie:', error);
            }
        }

        console.log("Other Cookies \n", otherCookies);
        console.log("\nMy Cookies \n", myCookies);

        try {
            const recommendation = await match(otherCookies, myCookies);
            setMatchMade(recommendation);
        } catch (error) {
            console.error('Error generating match:', error);
        } finally {
            setLoading(false);
        }
    };

    const parseString = (str) => {
        // Regular expression to capture user addresses and details
        const addressRegex = /0x[a-fA-F0-9]{40}/g;
        const detailRegex = /Both users are predicted to experience(.*?)\.\s*This suggests(.*)/;
    
        // Extract addresses
        const addresses = str.match(addressRegex) || [];
    
        // Extract details
        const detailMatch = str.match(detailRegex);
        const details = detailMatch ? detailMatch.slice(1) : [];
    
        return {
            addresses,
            details
        };
    };
    
    const DynamicDisplay = ({ text }) => {
        const [parsedData, setParsedData] = useState({ addresses: [], details: [] });
    
        useEffect(() => {
            const data = parseString(text);
            setParsedData(data);
        }, [text]);
    
        return (
            <div className="flex flex-col items-center">
                

                <ul className="menu bg-base-200 rounded-box w-8/12 items-center justify-center flex flex-col">
  <li className="menu-title text-black text-lg">Most Similar Users</li>
  <li className="w-full text-center text-lg">{parsedData.addresses.length >= 2 && (
                    <p className="text-center">It's a Match! Oracular found the user with address {parsedData.addresses[0]} is the most similar to you.
                    </p>
                )}</li>
                <div className="divider">WHY,YOU ASK?</div>
                <li className="font-semibold text-lg">Because this is what the future holds for the both of you:</li>
                <li className="text-lg">{matchMade.split('.')[1]}.</li>
                <div className="divider"></div>

                <li className="text-lg">We've done our part. Your turn now, partner!🥂</li>
</ul>



                
               
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full items-center">
            {!loading && !matchMade && <button 
                onClick={handleMatch} 
                style={{ fontWeight: '700' }} 
                className="button-56" 
                role="button"
            >
                Match Me UP!✨
            </button>}
            {loading && !loading2 && <p className="mb-4 text-lg">Finding the best match for you...</p>}
            {loading && <span className="mt-12 loading loading-ring loading-lg"></span>}
            {!loading && matchMade && <p className="mb-4 text-lg"><DynamicDisplay text={matchMade} /></p>}

            



        </div>
    );
}
