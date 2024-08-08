// queryFunctions.js

import { gql, request } from 'graphql-request';
import { arbitrumQuery } from './subgraphEndPoint';

// Define the GraphQL query
const query = gql`
  {
    cookieSentToGossips(first:1000){
    tokenId
    tokenOwner
    gossipNetworkId
   }
  }
`;

// Export the query function
export async function FetchCookiesSentToGossip() {
  try {
    const data = await request(arbitrumQuery, query);
    return data;
  } catch (error) {
    console.error("Error fetching cookies:", error);
    throw error;
  }
}
