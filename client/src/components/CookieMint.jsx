import { CookieContract } from "../contracts/Cookie";
import { OracularProtocolContract,OracleProtocolAddress } from "../contracts/OracularProtocol";
import { useWriteContract } from 'wagmi'
import { useState } from "react";
import Stepper from "./Stepper";

export default function CookieMint({ walletAddr }) {

    const { writeContract,writeContractAsync } = useWriteContract()
    const [ metadata,setMetadata ] = useState();

   

    const handleSendCookietoNetwork = async() =>{
        await writeContractAsync({
            abi:OracularProtocolContract.abi,
            address:OracleProtocolAddress,
            functionName:'sendCookieToGossipNetwork',
            args:[BigInt(1)]
        }).then((res)=>{
            console.log(res);
        })
    }

    return(
        <div className="w-full pt-4 flex flex-col text-center items-center justify-center">
        <h1 className="pb-4 text-5xl font-bold text-center">Make your Fortune Verifiable.</h1>
        <Stepper/>
        
        {/* <input  onChange={(e)=>{setMetadata(e.target.value)}} type="text" placeholder="Enter Metadata" className="input input-bordered w-full max-w-xs mb-4" />
        <button onClick={handleMint} style={{fontWeight:'700'}} className="button-56" role="button">Mint Cookie!🍪</button>
        <button onClick={handleSendCookietoNetwork} className="btn btn-secondary mt-4">Send Cookie to Gossip Network</button> */}
        </div>
    
   )
    
}