// queryFunctions.js

import { gql, request } from 'graphql-request';
import { arbitrumQuery } from './subgraphEndPoint';

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


// Define the URL for the GraphQL endpoint
//const url = 'https://api.studio.thegraph.com/query/85854/oracularprotocol/version/latest';

// Export the query function
export async function FetchCookiesMinted() {
  try {
    const data = await request(arbitrumQuery, query);
    return data;
  } catch (error) {
    console.error("Error fetching cookies:", error);
    throw error;
  }
}

export async function FetchCookiesSentToGossip() {
  try {
    const data = await request(arbitrumQuery, querySentToGossipNetwork);
    return data;
  } catch (error) {
    console.error("Error fetching cookies:", error);
    throw error;
  }
}

