import { baseUrl } from "./baseURL";
import { handleInternalTxnRetrieval } from "./internal_transaction";

export const handleTransactionsRetrieval = async (walletAddr) => {
    let json_data = {

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
        apikey: import.meta.env.VITE_ARBITRUM_SEPOLIA_API_KEY,  
    });
  
    const url = `${baseUrl}?${params.toString()}`;  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Iterate through transactions
        for (const txn of data.result) {
            // Convert to lowercase for comparison
            const toAddressLower = txn.to?.toLowerCase();
            const walletAddrLower = walletAddr.toString().toLowerCase();
            //console.log(txn.input);

            // Faucet Transfers
            if (txn.contractAddress === null) {
                // Await internal transaction retrieval
                // const internal_txn_result = await handleInternalTxnRetrieval(txn.hash);
                // console.log("Hash: ",txn.hash,"Txn Internal Transaction: ",internal_txn_result);

                // Faucet Transfers
                if (txn.value === '1000000000000000000' && toAddressLower === walletAddrLower) {
                    json_data.transactions.push({
                        "type": "transfer_faucet",
                        "amount": txn.value,
                        "timestamp": txn.timeStamp,
                        "hash":txn.hash
                    });
                }
                // Funds sent to this wallet
                else if (txn.to === walletAddrLower && txn.value !== '1000000000000000000') {
                    json_data.transactions.push({
                        "type": "transfer_receive",
                        "amount": txn.value,
                        "timestamp": txn.timeStamp,
                        "hash":txn.hash
                    });
                }
                // Funds sent from this wallet
                else if (txn.from.toLowerCase() === walletAddrLower && txn.input===null) {
                    json_data.transactions.push({
                        "type": "transfer_send",
                        "amount": txn.value,
                        "timestamp": txn.timeStamp,
                        "hash":txn.hash
                    });
                }
                else if(txn.from.toLowerCase() === walletAddrLower && txn.input!==null){
                    json_data.interactions.push({
                        "contract": txn.to,
                        "action": "contract_fxn_interaction", // Determine the action based on txn details
                        "amount": txn.value,
                        "timestamp": txn.timeStamp,
                        "hash":txn.hash
                    });

                }
            } else {
                const internal_txn_result = await handleInternalTxnRetrieval(txn.hash);
                let action = ""

                //Contract Deployment Action
                if(internal_txn_result!==null){
                    if(internal_txn_result[0]?.type === "CREATE2" || internal_txn_result[0]?.type === "CREATE"){
                        action = 'deploy_contract'
                    }
                }
                json_data.interactions.push({
                    "contract": txn.contractAddress,
                    "action": action, // Determine the action based on txn details
                    "amount": txn.value,
                    "timestamp": txn.timeStamp,
                    "hash":txn.hash
                });
            }
        }
        return json_data;
    } catch (error) {
        console.error('There was an error retrieving the transactions:', error);
        throw error; // Re-throw the error to be handled by the calling code if needed
    }
  };
  