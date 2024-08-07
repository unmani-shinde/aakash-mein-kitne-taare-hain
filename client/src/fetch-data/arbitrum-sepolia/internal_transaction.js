import { baseUrl } from "./baseURL";


export const handleInternalTxnRetrieval = async (parent_hash) => {  

    const params = new URLSearchParams({
        module: 'account',
        action: 'txlistinternal',
        txhash: parent_hash,
        apikey: import.meta.env.VITE_ARBITRUM_SEPOLIA_API_KEY,  
    });
  
    const url = `${baseUrl}?${params.toString()}`;  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
    //   console.log(data.result);
      
      return data.result

    } catch (error) {
      console.error('There was an error retrieving the internal transactions:', error);
      throw error; // Re-throw the error to be handled by the calling code if needed
    }
  };