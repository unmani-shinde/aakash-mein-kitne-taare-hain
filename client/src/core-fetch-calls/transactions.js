import { baseUrl } from "./baseURL";
import { useAccount } from "wagmi";

export const handleTransactionsRetrieval = async (walletAddr) => {
    let json_data = {"user_id": walletAddr,

    "transactions": [
        // {"type": "transfer", "amount": 2.5, "timestamp": "2024-01-01T12:00:00Z"},       
    ],
    "interactions": [
        // {"contract": "DeFiProtocol", "action": "stake", "amount": 5.0, "timestamp": "2024-01-03T10:00:00Z"},    
    ]
    }

    const params = new URLSearchParams({
        module: 'account',
        action: 'txlist',
        address: walletAddr,
        startblock: '0',
        endblock: '99999999',
        sort: 'asc',
        offset:'100',
        apikey: import.meta.env.VITE_CORE_API_KEY,  
    });
  
    const url = `${baseUrl}?${params.toString()}`;  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      //console.log(data.result);

      data.result?.map((txn,index)=>{
        //Faucet Transfers
        if(txn.contractAddress===null && txn.to==walletAddr){
            json_data.transactions.push({
                "type": "transfer_from", "amount": txn.value, "timestamp": txn.timeStamp,   
            })
        }
        //Contract Interactions
        else if(txn.contractAddress!==null && txn.from==walletAddr){
            json_data.interactions.push({
                "contract": txn.contractAddress, "action": "", "amount": txn.value, "timestamp": txn.timeStamp
            })
        }
        //Transfer to another Account
        else if(txn.contractAddress===null && txn.to!==walletAddr && txn.value!=="0"){
            console.log(txn.to,walletAddr);
            json_data.transactions.push({
                "type": "transfer_to", "amount": txn.value, "timestamp": txn.timeStamp,   
            })

        }
      })

      return json_data

    } catch (error) {
      console.error('There was an error retrieving the transactions:', error);
      throw error; // Re-throw the error to be handled by the calling code if needed
    }
  };
  