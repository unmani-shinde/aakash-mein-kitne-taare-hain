import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Predict from "../components/Predict";
import HelloWorld from "../components/HelloWorldTest";
// import SIWE from "../components/SIWE";

export default function Home() {
    const account = useAccount()

    return(<div className="flex flex-col items-center justify-center">

    
    
    {account.isConnected?<div><p>Connected Address: {account.address}</p><Predict walletAddr={account.address.toString()} /><HelloWorld/></div>:<ConnectKitButton/>}
    
    
    </div>)
    
}