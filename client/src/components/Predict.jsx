import { Button } from "flowbite-react";
import { useState,useRef } from "react";

import { handleTransactionsRetrieval } from "../fetch-data/core/transactions";
import { handleERC20TransfersRetrieval } from "../fetch-data/core/erc20transfers";

export default function Predict({ walletAddr }) {
    const [prediction, setPrediction] = useState("");
    const isPredictionset = useRef();
    const user_onchain_activity = {
        "userId": walletAddr,
        "transactions":[],
        "interactions":[],
        "recieve_erc20":[],
        "send_erc20":[]
    }


    
    const handlePrediction = async() =>{
        isPredictionset.current = false
        console.log("Fetching Transactions Data... \n");
        const json_data_txns = await handleTransactionsRetrieval(walletAddr);
        console.log("Fetched Transactions Data.");
        //console.log(json_data_txns);
        console.log("\n ---------------------- \n");
        console.log("Now Fetching ERC20 Transfers Data... \n");
        const json_data_erc20= await handleERC20TransfersRetrieval(walletAddr);
        console.log("Fetched ERC20 Token Transfers Data.");
       // console.log(json_data_erc20);
        user_onchain_activity.transactions = json_data_txns.transactions;
        user_onchain_activity.interactions = json_data_txns.interactions,
        user_onchain_activity.recieve_erc20 = json_data_erc20.receive_erc20;
        user_onchain_activity.send_erc20 = json_data_erc20.send_erc20;

        console.log("User ",walletAddr,"'s On Chain Activity: \n");
        console.log(user_onchain_activity);
        
        

        
        
        
    }



    return(<Button className="mr-10" onClick={handlePrediction}>Click to Predict 🪄</Button>)
    
}