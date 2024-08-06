import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Predict from "../components/Predict";
import HelloWorld from "../components/HelloWorldTest";
import CookieMint from "../components/CookieMint";
// import SIWE from "../components/SIWE";

export default function Home() {
    const account = useAccount()

    return(<div className="flex flex-col items-center justify-center">
        <ConnectKitButton/>  
    
    {account.isConnected?
    <div>
        <p className="pt-12">Connected Address: {account.address}</p>
        <div className="flex flex-row">
            {/* <Predict walletAddr={account.address.toString()} /> */}
            <CookieMint walletAddr={account.address.toString()}/> 
        </div>
    </div>
    :
    <>
        <p>Connect Wallet</p>
    </>}
    
    
    </div>)
    
}