// queryFunctions.js

import { gql, request } from 'graphql-request';

// Define the GraphQL query
const query = gql`
  {
    cookieMinteds(first: 1000) {
      tokenId
      tokenOwner
      transactionHash
    }
  }
`;

// Define the URL for the GraphQL endpoint
const url = 'https://api.studio.thegraph.com/query/85854/oracularprotocol/version/latest';

// Export the query function
export async function FetchCookiesMinted() {
  try {
    const data = await request(url, query);
    return data;
  } catch (error) {
    console.error("Error fetching cookies:", error);
    throw error;
  }
}
