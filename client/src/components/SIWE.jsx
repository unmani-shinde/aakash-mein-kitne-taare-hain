import { useState } from "react";
import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";

export default function SIWE({ walletAddress }) {

    
    const [isAuthorized,setIsAuthorized] = useState(false);
    const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage()
    
    const handleSIWE = async () =>{
        let message = "Sign in to Oracular";

        signMessage({message})
        const recoveredAddress = await recoverMessageAddress({
        message: "Sign in to Oracular",
        signature: signMessageData,
        })
        console.log("Recovered Address: ",recoveredAddress);
        if(recoveredAddress==walletAddress){
            setIsAuthorized(true)
        }
        else{
            setIsAuthorized(false)
        }

    }

    return (<>
        <button onClick={handleSIWE} style={{backgroundColor:'peachpuff',padding:'10px',borderRadius:'10px'}}>Verify Signature</button>
        {!isLoading && <div>Authorization: {isAuthorized?"Verified":"Not Verified"}</div>}
    
    </>
    
    )

}