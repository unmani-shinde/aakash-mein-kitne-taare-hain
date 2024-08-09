// queryFunctions.js

import { gql, request } from 'graphql-request';
import { arbitrumQuery, amoyQuery } from './subgraphEndPoint';


// Define the GraphQL query
const query = gql`
  {
    cookieMinteds(first: 1000) {
      tokenId
      tokenOwner
      transactionHash
      uri
    }
  }
`;

const querySentToGossipNetwork = gql`
{
  cookieSentToGossips(first:1000){
  tokenId
  tokenOwner
  gossipNetworkId
 }
}
`;
// Export the query function
export async function FetchCookiesMinted(chainId) {
  
  const url = chainId === 421614 ? arbitrumQuery : amoyQuery;

  try {
    const data = await request(url, query);
    return data;
  } catch (error) {
    console.error("Error fetching cookies:", error);
    throw error;
  }
}

export async function FetchCookiesSentToGossip(chainId) {
  
  const url = chainId === 421614 ? arbitrumQuery : amoyQuery;

  try {
    const data = await request(url, querySentToGossipNetwork);
    return data;
  } catch (error) {
    console.error("Error fetching cookies:", error);
    throw error;
  }
}

