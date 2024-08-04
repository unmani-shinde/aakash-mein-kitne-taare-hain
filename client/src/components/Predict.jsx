import { Button } from "flowbite-react";
import { useState,useRef } from "react";

import { handleTransactionsRetrieval } from "../core-fetch-calls/transactions";

export default function Predict({ walletAddr }) {
    const [prediction, setPrediction] = useState("");
    const isPredictionset = useRef();


    
    const handlePrediction = async() =>{
        isPredictionset.current = false
        const json_data = await handleTransactionsRetrieval(walletAddr);
        console.log(json_data);
        
    }



    return(<Button onClick={handlePrediction}>Click to Predict 🪄</Button>)
    
}