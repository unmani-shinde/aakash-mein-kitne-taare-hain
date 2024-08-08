import { baseUrl } from "./baseURL";

export const handleERC20TransfersRetrieval = async (walletAddr) => {
    let json_data = {
    //Tokens sent to this wallet
    "receive_erc20": [
        //receive_mint or receive_transfer
        // {"type": "receive_mint", "amount": 2.5, "timestamp": "2024-01-01T12:00:00Z"},       
    ],
    //Tokens sent from this wallet
    "send_erc20": [
        // {"contract": "DeFiProtocol", "action": "stake", "amount": 5.0, "timestamp": "2024-01-03T10:00:00Z"},    
    ]
    }

    const params = new URLSearchParams({
        module: 'account',
        action: 'tokentx',
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

        if(data.result){
            for (const txn of data?.result) {     

                const toAddressLower = txn.to?.toLowerCase();
                const fromAddressLower = txn.from?.toLowerCase();
                const walletAddrLower = walletAddr.toString().toLowerCase();
                if(txn.from==="0x0000000000000000000000000000000000000000" && toAddressLower===walletAddrLower){
                    json_data.receive_erc20.push({
                        "type": "receive_mint",
                        "timestamp": txn.timeStamp,
                        "hash":txn.hash
                    });
                }
                else if(txn.from!=="0x0000000000000000000000000000000000000000" && toAddressLower===walletAddrLower){  
                    json_data.receive_erc20.push({
                    "type": "receive_transfer",
                    "timestamp": txn.timeStamp,
                    "hash":txn.hash
                });
            }
                else if(fromAddressLower===walletAddrLower){
                    json_data.send_erc20.push({
                        "type": "send",
                        "timestamp": txn.timeStamp,
                        "hash":txn.hash
                    });
    
                }
            }
        }      

        return json_data;
    } catch (error) {
        console.error('There was an error retrieving the transactions:', error);
        throw error; // Re-throw the error to be handled by the calling code if needed
    }
  };
 